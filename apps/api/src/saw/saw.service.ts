import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { 
  type SawBulkScoreDto, 
  type ComputeSawRankingDto,
  type SawRanking,
  CriteriaType 
} from '@sibea/shared';

@Injectable()
export class SawService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async importScores(dto: SawBulkScoreDto, userId: string) {
    // Validate scholarship exists
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: dto.scholarshipId },
      include: { 
        criteria: { orderBy: { order: 'asc' } },
        applications: true,
      },
    });

    if (!scholarship) {
      throw new NotFoundException('Beasiswa tidak ditemukan');
    }

    if (scholarship.criteria.length === 0) {
      throw new BadRequestException('Tidak ada kriteria yang didefinisikan');
    }

    // Validate all scores
    for (const score of dto.scores) {
      const applicationExists = scholarship.applications.some(app => app.id === score.applicationId);
      const criterionExists = scholarship.criteria.some(crit => crit.id === score.criterionId);

      if (!applicationExists) {
        throw new BadRequestException(`Aplikasi ${score.applicationId} tidak ditemukan`);
      }

      if (!criterionExists) {
        throw new BadRequestException(`Kriteria ${score.criterionId} tidak ditemukan`);
      }

      if (score.value < 0) {
        throw new BadRequestException('Nilai tidak boleh negatif');
      }
    }

    // Delete existing scores for this scholarship
    await this.prisma.scoreRaw.deleteMany({
      where: {
        application: {
          scholarshipId: dto.scholarshipId,
        },
      },
    });

    // Insert new scores
    const scores = await this.prisma.scoreRaw.createMany({
      data: dto.scores.map(score => ({
        applicationId: score.applicationId,
        criterionId: score.criterionId,
        value: score.value,
      })),
    });

    await this.auditService.log({
      actorId: userId,
      action: 'IMPORT',
      entity: 'ScoreRaw',
      entityId: dto.scholarshipId,
      newData: { count: dto.scores.length },
    });

    return scores;
  }

  async computeRanking(dto: ComputeSawRankingDto, userId: string) {
    // Get scholarship with criteria and applications
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: dto.scholarshipId },
      include: {
        criteria: { orderBy: { order: 'asc' } },
        applications: {
          include: {
            scores: true,
            user: {
              include: { profileSiswa: true },
            },
          },
        },
        weights: {
          where: { method: 'AHP' },
          include: { criterion: true },
        },
      },
    });

    if (!scholarship) {
      throw new NotFoundException('Beasiswa tidak ditemukan');
    }

    if (scholarship.criteria.length === 0) {
      throw new BadRequestException('Tidak ada kriteria yang didefinisikan');
    }

    if (scholarship.weights.length === 0) {
      throw new BadRequestException('Bobot kriteria belum dihitung. Lakukan AHP terlebih dahulu.');
    }

    // Validate all applications have scores for all criteria
    for (const application of scholarship.applications) {
      for (const criterion of scholarship.criteria) {
        const hasScore = application.scores.some(score => score.criterionId === criterion.id);
        if (!hasScore) {
          throw new BadRequestException(
            `Aplikasi ${application.id} belum memiliki nilai untuk kriteria ${criterion.name}`
          );
        }
      }
    }

    // Build score matrix
    const applications = scholarship.applications;
    const criteria = scholarship.criteria;
    const rawScores: number[][] = [];
    
    applications.forEach(app => {
      const appScores: number[] = [];
      criteria.forEach(criterion => {
        const score = app.scores.find(s => s.criterionId === criterion.id);
        appScores.push(score?.value || 0);
      });
      rawScores.push(appScores);
    });

    // Normalize scores
    const normalizedScores = this.normalizeMatrix(rawScores, criteria);

    // Calculate final scores with weights
    const weights = criteria.map(criterion => {
      const weight = scholarship.weights.find(w => w.criterionId === criterion.id);
      return weight?.value || 0;
    });

    const finalScores = this.calculateFinalScores(normalizedScores, weights);

    // Create ranking
    const ranking: SawRanking[] = applications
      .map((app, index) => ({
        applicationId: app.id,
        score: finalScores[index],
        rank: 0, // Will be set after sorting
      }))
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    // Save or update SAW matrix
    const existingMatrix = await this.prisma.sawScoreMatrix.findUnique({
      where: { scholarshipId: dto.scholarshipId },
    });

    const sawMatrix = existingMatrix
      ? await this.prisma.sawScoreMatrix.update({
          where: { id: existingMatrix.id },
          data: {
            rawScores,
            normalizedScores,
            finalScores,
            ranking: ranking as any, // Type assertion for JSON field
          },
        })
      : await this.prisma.sawScoreMatrix.create({
          data: {
            scholarshipId: dto.scholarshipId,
            rawScores,
            normalizedScores,
            finalScores,
            ranking: ranking as any, // Type assertion for JSON field
          },
        });

    // Update application scores and ranks
    await Promise.all(
      ranking.map(rank =>
        this.prisma.application.update({
          where: { id: rank.applicationId },
          data: {
            score: rank.score,
            rank: rank.rank,
          },
        })
      )
    );

    // Save results
    await this.prisma.result.deleteMany({
      where: {
        scholarshipId: dto.scholarshipId,
        method: 'SAW',
      },
    });

    await this.prisma.result.createMany({
      data: ranking.map(rank => ({
        applicationId: rank.applicationId,
        scholarshipId: dto.scholarshipId,
        score: rank.score,
        rank: rank.rank,
        method: 'SAW',
      })),
    });

    await this.auditService.log({
      actorId: userId,
      action: 'UPDATE',
      entity: 'SawScoreMatrix',
      entityId: sawMatrix.id,
      newData: { applicationCount: applications.length },
    });

    return {
      matrix: sawMatrix,
      ranking,
      applications: applications.map((app, index) => ({
        id: app.id,
        user: app.user,
        score: finalScores[index],
        rank: ranking.find(r => r.applicationId === app.id)?.rank || 0,
      })),
    };
  }

  async getRanking(scholarshipId: string) {
    const sawMatrix = await this.prisma.sawScoreMatrix.findUnique({
      where: { scholarshipId },
    });

    if (!sawMatrix) {
      throw new NotFoundException('Hasil perankingan tidak ditemukan');
    }

    const applications = await this.prisma.application.findMany({
      where: { scholarshipId },
      include: {
        user: {
          include: { profileSiswa: true },
        },
      },
      orderBy: { rank: 'asc' },
    });

    return {
      matrix: sawMatrix,
      applications,
    };
  }

  private normalizeMatrix(rawScores: number[][], criteria: any[]): number[][] {
    const normalizedScores: number[][] = [];
    const numApplications = rawScores.length;
    const numCriteria = criteria.length;

    for (let j = 0; j < numCriteria; j++) {
      const criterion = criteria[j];
      const columnValues = rawScores.map(row => row[j]);
      
      let normalizedColumn: number[];
      
      if (criterion.type === CriteriaType.BENEFIT) {
        // For benefit criteria: r_ij = x_ij / max(x_ij)
        const maxValue = Math.max(...columnValues);
        normalizedColumn = columnValues.map(value => maxValue > 0 ? value / maxValue : 0);
      } else {
        // For cost criteria: r_ij = min(x_ij) / x_ij
        const minValue = Math.min(...columnValues.filter(v => v > 0));
        normalizedColumn = columnValues.map(value => value > 0 ? minValue / value : 0);
      }

      // Add normalized column to matrix
      for (let i = 0; i < numApplications; i++) {
        if (!normalizedScores[i]) {
          normalizedScores[i] = [];
        }
        normalizedScores[i][j] = normalizedColumn[i];
      }
    }

    return normalizedScores;
  }

  private calculateFinalScores(normalizedScores: number[][], weights: number[]): number[] {
    return normalizedScores.map(row =>
      row.reduce((sum, score, index) => sum + (score * weights[index]), 0)
    );
  }
}

