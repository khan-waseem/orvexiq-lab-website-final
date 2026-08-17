import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const caseStudiesPageHeroSchema = z.object({
  headline: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

/** A category filter pill (Figma 44:26 and siblings). `value` of null = show all. */
export const caseFilterSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string().nullable(),
});

export const caseStudiesPageContentSchema = z.object({
  hero: caseStudiesPageHeroSchema,
  grid: z.object({
    filters: z.array(caseFilterSchema),
    countLabelSingular: z.string(),
    countLabelPlural: z.string(),
    visualPlaceholderLabel: z.string(),
    emptyLabel: z.string(),
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

export type CaseStudiesPageHeroContent = z.infer<typeof caseStudiesPageHeroSchema>;
export type CaseFilter = z.infer<typeof caseFilterSchema>;
export type CaseStudiesPageContent = z.infer<typeof caseStudiesPageContentSchema>;
