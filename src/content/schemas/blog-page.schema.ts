import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const blogPageHeroSchema = z.object({
  /** Plain line above the headline, as on the landing hero. */
  eyebrow: z.string(),
  headline: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

/** A category filter pill (Figma 64:40 and siblings). `value` of null = show all. */
export const blogFilterSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string().nullable(),
});

export const blogPageContentSchema = z.object({
  hero: blogPageHeroSchema,
  featured: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    /** Trailing run in the violet gradient — one accent per headline. */
    headlineAccent2: z.string(),
    readMoreLabel: z.string(),
    imagePlaceholderLabel: z.string(),
  }),
  grid: z.object({
    filters: z.array(blogFilterSchema),
    imagePlaceholderLabel: z.string(),
    emptyLabel: z.string(),
  }),
  newsletter: z.object({
    headline: z.string(),
    subdescription: z.string(),
    inputPlaceholder: z.string(),
    submitLabel: z.string(),
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

export type BlogPageHeroContent = z.infer<typeof blogPageHeroSchema>;
export type BlogFilter = z.infer<typeof blogFilterSchema>;
export type BlogPageContent = z.infer<typeof blogPageContentSchema>;
