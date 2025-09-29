import { z } from 'zod';
import { ApplicationStatus, CriteriaType } from '../types/scholarship';

export const createScholarshipSchema = z.object({
  name: z.string().min(1, 'Nama beasiswa wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
  quota: z.number().min(1, 'Kuota minimal 1'),
  requirements: z.array(z.string()).min(1, 'Minimal 1 persyaratan'),
  isActive: z.boolean().optional().default(true)
}).refine((data) => data.periodEnd > data.periodStart, {
  message: 'Periode berakhir harus setelah periode mulai',
  path: ['periodEnd']
});

export const updateScholarshipSchema = z.object({
  name: z.string().min(1, 'Nama beasiswa wajib diisi').optional(),
  description: z.string().min(1, 'Deskripsi wajib diisi').optional(),
  periodStart: z.coerce.date().optional(),
  periodEnd: z.coerce.date().optional(),
  quota: z.number().min(1, 'Kuota minimal 1').optional(),
  requirements: z.array(z.string()).min(1, 'Minimal 1 persyaratan').optional(),
  isActive: z.boolean().optional()
});

export const createCriterionSchema = z.object({
  scholarshipId: z.string().uuid(),
  name: z.string().min(1, 'Nama kriteria wajib diisi'),
  description: z.string().optional(),
  type: z.nativeEnum(CriteriaType),
  weight: z.number().min(0).max(1).optional(),
  order: z.number().min(1)
});

export const updateCriterionSchema = z.object({
  name: z.string().min(1, 'Nama kriteria wajib diisi').optional(),
  description: z.string().optional(),
  type: z.nativeEnum(CriteriaType).optional(),
  weight: z.number().min(0).max(1).optional(),
  order: z.number().min(1).optional()
});

export const createSubCriterionSchema = z.object({
  criterionId: z.string().uuid(),
  name: z.string().min(1, 'Nama subkriteria wajib diisi'),
  description: z.string().optional(),
  weight: z.number().min(0).max(1),
  order: z.number().min(1)
});

export const updateSubCriterionSchema = z.object({
  name: z.string().min(1, 'Nama subkriteria wajib diisi').optional(),
  description: z.string().optional(),
  weight: z.number().min(0).max(1).optional(),
  order: z.number().min(1).optional()
});

export const createApplicationSchema = z.object({
  scholarshipId: z.string().uuid(),
  evidences: z.array(z.object({
    kind: z.string(),
    filename: z.string(),
    url: z.string(),
    metadata: z.record(z.any()).optional()
  })).optional().default([])
});

export const updateApplicationSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
  notes: z.string().optional(),
  evidences: z.array(z.object({
    kind: z.string(),
    filename: z.string(),
    url: z.string(),
    metadata: z.record(z.any()).optional()
  })).optional()
});

export const scoreApplicationSchema = z.object({
  applicationId: z.string().uuid(),
  criterionId: z.string().uuid(),
  value: z.number().min(0)
});

export const bulkScoreSchema = z.object({
  scores: z.array(scoreApplicationSchema)
});

export type CreateScholarshipDto = z.infer<typeof createScholarshipSchema>;
export type UpdateScholarshipDto = z.infer<typeof updateScholarshipSchema>;
export type CreateCriterionDto = z.infer<typeof createCriterionSchema>;
export type UpdateCriterionDto = z.infer<typeof updateCriterionSchema>;
export type CreateSubCriterionDto = z.infer<typeof createSubCriterionSchema>;
export type UpdateSubCriterionDto = z.infer<typeof updateSubCriterionSchema>;
export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>;
export type ScoreApplicationDto = z.infer<typeof scoreApplicationSchema>;
export type BulkScoreDto = z.infer<typeof bulkScoreSchema>;
