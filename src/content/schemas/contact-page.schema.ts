import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const contactPageHeroSchema = z.object({
  /** Plain line above the headline, as on the landing hero. */
  eyebrow: z.string(),
  headline: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

export const contactFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  placeholder: z.string(),
  type: z.enum(['text', 'email', 'textarea']),
  /** Half-width fields pair up into a row; full-width fields span the form. */
  span: z.enum(['half', 'full']).default('half'),
  autoComplete: z.string().optional(),
});

export const contactInfoBlockSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  body: z.string(),
  /** Renders the value as a mailto link when set. */
  email: z.string().optional(),
});

/** A single line in the contact page's location band. */
export const contactMapFactSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  body: z.string(),
});

export const contactPageContentSchema = z.object({
  hero: contactPageHeroSchema,
  form: z.object({
    fields: z.array(contactFieldSchema),
    submitLabel: z.string(),
    unavailableNote: z.string(),
  }),
  info: z.array(contactInfoBlockSchema),
  map: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    /** Trailing run in the violet gradient — one accent per headline. */
    headlineAccent2: z.string(),
    subdescription: z.string(),
    addressLabel: z.string(),
    addressLines: z.array(z.string()),
    /** Search string the embedded map and the directions link both resolve. */
    mapQuery: z.string(),
    directionsLabel: z.string(),
    mapTitle: z.string(),
    facts: z.array(contactMapFactSchema),
  }),
  seo: seoMetadataSchema.optional(),
});

export type ContactPageHeroContent = z.infer<typeof contactPageHeroSchema>;
export type ContactField = z.infer<typeof contactFieldSchema>;
export type ContactInfoBlock = z.infer<typeof contactInfoBlockSchema>;
export type ContactPageContent = z.infer<typeof contactPageContentSchema>;
