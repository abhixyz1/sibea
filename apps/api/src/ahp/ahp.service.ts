import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { 
  type AhpMatrixDto, 
  type ComputeAhpWeightsDto,
  type AhpResult,
  RANDOM_INDEX 
} from '@sibea/shared';

@Injectable()
export class AhpService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async createOrUpdateMatrix(
    dto: AhpMatrixDto,
    userId: string,
  ) {
    // Validate scholarship exists
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: dto.scholarshipId },
      include: { criteria: true },
    });

    if (!scholarship) {
      throw new NotFoundException('Beasiswa tidak ditemukan');
    }

    const criteriaCount = scholarship.criteria.length;
    
    if (criteriaCount < 2) {
      throw new BadRequestException('Minimal 2 kriteria diperlukan untuk AHP');
    }

    // Build pairwise comparison matrix
    const matrix = this.buildPairwiseMatrix(
      dto.comparisons as { criterionA: string; criterionB: string; value: number }[],
      scholarship.criteria
    );

    // Save or update matrix
    const existingMatrix = await this.prisma.ahpMatrix.findUnique({
      where: { scholarshipId: dto.scholarshipId },
    });

    const ahpMatrix = existingMatrix
      ? await this.prisma.ahpMatrix.update({
          where: { id: existingMatrix.id },
          data: {
            matrix,
            size: criteriaCount,
            // Reset computed values when matrix changes
            weights: null,
            lambdaMax: null,
            consistencyIndex: null,
            consistencyRatio: null,
            isConsistent: null,
          },
        })
      : await this.prisma.ahpMatrix.create({
          data: {
            scholarshipId: dto.scholarshipId,
            size: criteriaCount,
            matrix,
          },
        });

    await this.auditService.log({
      actorId: userId,
      action: existingMatrix ? 'UPDATE' : 'CREATE',
      entity: 'AhpMatrix',
      entityId: ahpMatrix.id,
      newData: { scholarshipId: dto.scholarshipId, size: criteriaCount },
    });

    return ahpMatrix;
  }

  async computeWeights(dto: ComputeAhpWeightsDto, userId: string): Promise<AhpResult> {
    const ahpMatrix = await this.prisma.ahpMatrix.findUnique({
      where: { scholarshipId: dto.scholarshipId },
    });

    if (!ahpMatrix) {
      throw new NotFoundException('Matrix AHP tidak ditemukan');
    }

    const matrix = ahpMatrix.matrix as number[][];
    const result = this.calculateAhpWeights(matrix);

    // Update matrix with computed values
    await this.prisma.ahpMatrix.update({
      where: { id: ahpMatrix.id },
      data: {
        weights: result.weights,
        lambdaMax: result.lambdaMax,
        consistencyIndex: result.consistencyIndex,
        consistencyRatio: result.consistencyRatio,
        isConsistent: result.isConsistent,
      },
    });

    // If consistent, save weights to weights table
    if (result.isConsistent) {
      const criteria = await this.prisma.criterion.findMany({
        where: { scholarshipId: dto.scholarshipId },
        orderBy: { order: 'asc' },
      });

      await this.prisma.weight.deleteMany({
        where: { 
          scholarshipId: dto.scholarshipId,
          method: 'AHP',
        },
      });

      await this.prisma.weight.createMany({
        data: criteria.map((criterion, index) => ({
          scholarshipId: dto.scholarshipId,
          criterionId: criterion.id,
          value: result.weights[index],
          method: 'AHP',
        })),
      });
    }

    await this.auditService.log({
      actorId: userId,
      action: 'UPDATE',
      entity: 'AhpMatrix',
      entityId: ahpMatrix.id,
      newData: {
        isConsistent: result.isConsistent,
        consistencyRatio: result.consistencyRatio,
      },
    });

    return result;
  }

  async getMatrix(scholarshipId: string) {
    const ahpMatrix = await this.prisma.ahpMatrix.findUnique({
      where: { scholarshipId },
    });

    if (!ahpMatrix) {
      throw new NotFoundException('Matrix AHP tidak ditemukan');
    }

    const criteria = await this.prisma.criterion.findMany({
      where: { scholarshipId },
      orderBy: { order: 'asc' },
    });

    return {
      ...ahpMatrix,
      criteria,
    };
  }

  private buildPairwiseMatrix(
    comparisons: { criterionA: string; criterionB: string; value: number }[],
    criteria: { id: string; order: number }[],
  ): number[][] {
    const n = criteria.length;
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(1));

    // Create mapping from criterion ID to matrix index
    const criteriaMap = new Map(
      criteria
        .sort((a, b) => a.order - b.order)
        .map((c, index) => [c.id, index])
    );

    // Fill matrix with comparisons
    for (const comparison of comparisons) {
      const i = criteriaMap.get(comparison.criterionA);
      const j = criteriaMap.get(comparison.criterionB);

      if (i !== undefined && j !== undefined) {
        matrix[i][j] = comparison.value;
        matrix[j][i] = 1 / comparison.value; // Reciprocal
      }
    }

    return matrix;
  }

  private calculateAhpWeights(matrix: number[][]): AhpResult {
    const n = matrix.length;
    
    // Calculate column sums
    const columnSums = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        columnSums[j] += matrix[i][j];
      }
    }

    // Normalize matrix
    const normalizedMatrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        normalizedMatrix[i][j] = matrix[i][j] / columnSums[j];
      }
    }

    // Calculate priority vector (average of each row)
    const weights: number[] = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += normalizedMatrix[i][j];
      }
      weights[i] = sum / n;
    }

    // Calculate λmax (maximum eigenvalue)
    const weightedSums: number[] = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        weightedSums[i] += matrix[i][j] * weights[j];
      }
    }

    let lambdaMax = 0;
    for (let i = 0; i < n; i++) {
      lambdaMax += weightedSums[i] / weights[i];
    }
    lambdaMax /= n;

    // Calculate consistency measures
    const consistencyIndex = (lambdaMax - n) / (n - 1);
    const randomIndex = RANDOM_INDEX[n] || 1.49; // Use 1.49 for n > 10
    const consistencyRatio = consistencyIndex / randomIndex;
    const isConsistent = consistencyRatio <= 0.1;

    return {
      weights,
      lambdaMax,
      consistencyIndex,
      consistencyRatio,
      isConsistent,
    };
  }
}

