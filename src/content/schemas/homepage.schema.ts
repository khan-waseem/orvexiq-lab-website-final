import { z } from 'zod';
import { seoMetadataSchema, verificationMetadataSchema } from './common.schema';

export const sectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayOrder: z.number(),
});

export const approachStepSchema = z.object({
  id: z.string(),
  stepNumber: z.string(),
  title: z.string(),
  description: z.string(),
});

export const systemStageSchema = z.object({
  stageNumber: z.string(),
  stageName: z.string(),
  caption: z.string(),
  verification: verificationMetadataSchema.optional(),
});

export const homepageContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subdescription: z.string(),
    primaryCtaText: z.string(),
    secondaryCtaText: z.string(),
    heroIconAssetUrl: z.string(),
  }),
  sectorsSection: z.object({
    eyebrow: z.string(),
    sectors: z.array(sectorSchema),
  }),
  systemSection: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    stages: z.array(systemStageSchema),
  }),
  selectedWorkSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    viewAllText: z.string(),
  }),
  servicesSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
  }),
  approachSection: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subdescription: z.string(),
    steps: z.array(approachStepSchema),
  }),
  ctaSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    subdescriptionLine1: z.string(),
    subdescriptionLine2: z.string(),
    primaryCtaText: z.string(),
    emailCtaText: z.string(),
  }),
  seo: seoMetadataSchema,
});

export type HomepageContent = z.infer<typeof homepageContentSchema>;
