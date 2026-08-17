import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const aboutPageHeroSchema = z.object({
  headlineLine1: z.string(),
  headlineLine2: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

export const principleSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

export const aboutPageContentSchema = z.object({
  hero: aboutPageHeroSchema,
  story: z.object({
    eyebrow: z.string(),
    headlineLines: z.array(z.string()),
    paragraphs: z.array(z.string()),
  }),
  principles: z.object({
    headline: z.string(),
    items: z.array(principleSchema),
  }),
  impact: z.object({
    eyebrow: z.string(),
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
  seo: seoMetadataSchema.optional(),
});

export type AboutPageHeroContent = z.infer<typeof aboutPageHeroSchema>;
export type Principle = z.infer<typeof principleSchema>;
export type AboutPageContent = z.infer<typeof aboutPageContentSchema>;
