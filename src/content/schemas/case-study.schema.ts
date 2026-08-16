import { z } from 'zod';
import { seoMetadataSchema, verificationMetadataSchema } from './common.schema';

export const caseStudyOutcomeSchema = z.object({
  metric: z.string(),
  label: z.string(),
});

export const caseStudySchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.enum(['FINTECH', 'LOGISTICS', 'COMMERCE', 'TREASURY', 'AI', 'GENERAL']),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  servicesProvided: z.array(z.string()),
  coverScreenAssetUrl: z.string(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  outcomes: z.array(caseStudyOutcomeSchema).optional(),
  verification: verificationMetadataSchema.default({ isVerified: false }),
  publishedAt: z.string(),
  published: z.boolean().default(true),
  seo: seoMetadataSchema.optional(),
});

export type CaseStudyOutcome = z.infer<typeof caseStudyOutcomeSchema>;
export type CaseStudyItem = z.infer<typeof caseStudySchema>;
export type CaseStudy = CaseStudyItem;
