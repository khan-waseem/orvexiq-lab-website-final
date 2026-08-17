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
  /** Anonymised client descriptor shown beside the category tag (Figma 44:46) */
  clientDescriptor: z.string().optional(),
  /** Engagement year shown in the card meta line (Figma 44:49) */
  year: z.string().optional(),
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
