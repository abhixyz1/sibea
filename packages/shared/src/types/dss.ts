import { Criterion, Application } from './scholarship';

// AHP (Analytic Hierarchy Process) Types
export interface AhpMatrix {
  id: string;
  scholarshipId: string;
  size: number;
  matrix: number[][];
  weights?: number[];
  lambdaMax?: number;
  consistencyIndex?: number;
  consistencyRatio?: number;
  isConsistent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AhpPairwiseComparison {
  criterionA: string;
  criterionB: string;
  value: number; // 1-9 scale
}

export interface AhpResult {
  weights: number[];
  lambdaMax: number;
  consistencyIndex: number;
  consistencyRatio: number;
  isConsistent: boolean;
}

// SAW (Simple Additive Weighting) Types
export interface SawScoreMatrix {
  id: string;
  scholarshipId: string;
  rawScores: number[][];
  normalizedScores: number[][];
  finalScores: number[];
  ranking: SawRanking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SawRanking {
  applicationId: string;
  score: number;
  rank: number;
}

export interface SawInput {
  applicationId: string;
  criterionId: string;
  value: number;
}

// Decision Support System Types
export interface Weight {
  id: string;
  scholarshipId: string;
  criterionId: string;
  value: number;
  method: 'AHP' | 'MANUAL';
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  id: string;
  applicationId: string;
  scholarshipId: string;
  score: number;
  rank: number;
  method: 'SAW' | 'TOPSIS' | 'WP';
  createdAt: Date;
  updatedAt: Date;
}

export interface DecisionSnapshot {
  id: string;
  scholarshipId: string;
  method: 'AHP_SAW';
  criteria: Criterion[];
  weights: Weight[];
  applications: Application[];
  results: Result[];
  metadata: {
    ahpMatrix?: AhpMatrix;
    sawMatrix?: SawScoreMatrix;
    timestamp: Date;
    generatedBy: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Constants for AHP
export const AHP_SCALE = {
  EQUAL: 1,
  MODERATE: 3,
  STRONG: 5,
  VERY_STRONG: 7,
  EXTREME: 9,
  INTERMEDIATE_2: 2,
  INTERMEDIATE_4: 4,
  INTERMEDIATE_6: 6,
  INTERMEDIATE_8: 8
} as const;

export const AHP_SCALE_LABELS = {
  1: 'Sama penting',
  2: 'Sedikit lebih penting',
  3: 'Cukup penting',
  4: 'Lebih penting',
  5: 'Sangat penting',
  6: 'Sangat lebih penting',
  7: 'Jauh lebih penting',
  8: 'Sangat jauh lebih penting',
  9: 'Mutlak lebih penting'
} as const;

// Random Index for consistency checking
export const RANDOM_INDEX = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

export type AhpScaleValue = keyof typeof AHP_SCALE_LABELS;
