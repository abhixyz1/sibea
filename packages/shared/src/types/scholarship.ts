export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED = 'VERIFIED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum CriteriaType {
  BENEFIT = 'BENEFIT',
  COST = 'COST'
}

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  periodStart: Date;
  periodEnd: Date;
  quota: number;
  isActive: boolean;
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Criterion {
  id: string;
  scholarshipId: string;
  name: string;
  description?: string;
  type: CriteriaType;
  weight?: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  subCriteria?: SubCriterion[];
}

export interface SubCriterion {
  id: string;
  criterionId: string;
  name: string;
  description?: string;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  userId: string;
  scholarshipId: string;
  status: ApplicationStatus;
  submittedAt?: Date;
  reviewedAt?: Date;
  score?: number;
  rank?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  evidences: Evidence[];
  scores: ScoreRaw[];
}

export interface Evidence {
  id: string;
  applicationId: string;
  kind: string;
  filename: string;
  url: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScoreRaw {
  id: string;
  applicationId: string;
  criterionId: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

