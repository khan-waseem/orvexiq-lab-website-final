import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const serviceIncludeItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

export const serviceFaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const serviceDetailPageSchema = z.object({
  slug: z.string(),
  breadcrumbLabel: z.string(),
  hero: z.object({
    /** Plain line above the headline, as on the landing hero. */
    eyebrow: z.string(),
    headline: z.string(),
    subdescription: z.string(),
    iconAssetUrl: z.string(),
  }),
  why: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    paragraphs: z.array(z.string()),
  }),
  includes: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    /** Trailing run in the violet gradient — one accent per headline. */
    headlineAccent2: z.string(),
    items: z.array(serviceIncludeItemSchema),
  }),
  /** Design Systems only (Figma 139:71) — omitted on the other three pages. */
  auditOffer: z
    .object({
      eyebrow: z.string(),
      headlineLine1: z.string(),
      headlineAccent2: z.string(),
      body: z.string(),
      priceNote: z.string(),
      items: z.array(z.string()),
    })
    .optional(),
  deliverables: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    items: z.array(z.string()),
  }),
  relatedWork: z
    .object({
      eyebrow: z.string(),
      headlineLine1: z.string(),
      headlineAccent2: z.string(),
      title: z.string(),
      body: z.string(),
      href: z.string(),
    })
    .optional(),
  faq: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    items: z.array(serviceFaqItemSchema),
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

export const serviceDetailCollectionSchema = z.array(serviceDetailPageSchema);

export type ServiceIncludeItem = z.infer<typeof serviceIncludeItemSchema>;
export type ServiceDetailPage = z.infer<typeof serviceDetailPageSchema>;
