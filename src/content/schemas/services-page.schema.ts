import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const servicesPageHeroSchema = z.object({
  /** Plain line above the headline, as on the landing hero. */
  eyebrow: z.string(),
  headline: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

/**
 * A Service Detail block (Figma 31:3 and siblings).
 *
 * `slug` links the block to the canonical ServiceItem in services.json rather
 * than duplicating it. The copy here is page-specific: the Services page uses a
 * longer description and six deliverables per service, where the homepage card
 * uses a short description and four capabilities.
 */
export const serviceDetailBlockSchema = z.object({
  id: z.string(),
  slug: z.string(),
  stepNumber: z.string(),
  title: z.string(),
  description: z.string(),
  readMoreLabel: z.string(),
  deliverables: z.array(z.object({ id: z.string(), label: z.string() })),
});

export const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const servicesPageContentSchema = z.object({
  hero: servicesPageHeroSchema,
  serviceDetail: z.object({
    blocks: z.array(serviceDetailBlockSchema),
  }),
  faq: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    note: z.string(),
    items: z.array(faqItemSchema),
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

export type ServicesPageHeroContent = z.infer<typeof servicesPageHeroSchema>;
export type ServiceDetailBlock = z.infer<typeof serviceDetailBlockSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type ServicesPageContent = z.infer<typeof servicesPageContentSchema>;
