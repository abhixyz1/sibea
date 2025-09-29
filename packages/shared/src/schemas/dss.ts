import { z } from 'zod';

export const ahpPairwiseComparisonSchema = z.object({
  criterionA: z.string().uuid(),
  criterionB: z.string().uuid(),
  value: z.number().min(1).max(9)
});

export const ahpMatrixSchema = z.object({
  scholarshipId: z.string().uuid(),
  comparisons: z.array(ahpPairwiseComparisonSchema)
});

export const computeAhpWeightsSchema = z.object({
  scholarshipId: z.string().uuid()
});

export const sawScoreInputSchema = z.object({
  applicationId: z.string().uuid(),
  criterionId: z.string().uuid(),
  value: z.number().min(0)
});

export const sawBulkScoreSchema = z.object({
  scholarshipId: z.string().uuid(),
  scores: z.array(sawScoreInputSchema)
});

export const computeSawRankingSchema = z.object({
  scholarshipId: z.string().uuid()
});

export const createDecisionSnapshotSchema = z.object({
  scholarshipId: z.string().uuid(),
  method: z.enum(['AHP_SAW'])
});

export const exportResultsSchema = z.object({
  scholarshipId: z.string().uuid(),
  format: z.enum(['PDF', 'EXCEL']).optional().default('PDF')
});

export type AhpPairwiseComparisonDto = z.infer<typeof ahpPairwiseComparisonSchema>;
export type AhpMatrixDto = z.infer<typeof ahpMatrixSchema>;
export type ComputeAhpWeightsDto = z.infer<typeof computeAhpWeightsSchema>;
export type SawScoreInputDto = z.infer<typeof sawScoreInputSchema>;
export type SawBulkScoreDto = z.infer<typeof sawBulkScoreSchema>;
export type ComputeSawRankingDto = z.infer<typeof computeSawRankingSchema>;
export type CreateDecisionSnapshotDto = z.infer<typeof createDecisionSnapshotSchema>;
export type ExportResultsDto = z.infer<typeof exportResultsSchema>;
