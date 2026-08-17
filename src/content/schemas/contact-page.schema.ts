import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const contactPageHeroSchema = z.object({
  headlineLine1: z.string(),
  headlineLine2: z.string(),
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

export const contactPageContentSchema = z.object({
  hero: contactPageHeroSchema,
  form: z.object({
    fields: z.array(contactFieldSchema),
    submitLabel: z.string(),
    unavailableNote: z.string(),
  }),
  info: z.array(contactInfoBlockSchema),
  seo: seoMetadataSchema.optional(),
});

export type ContactPageHeroContent = z.infer<typeof contactPageHeroSchema>;
export type ContactField = z.infer<typeof contactFieldSchema>;
export type ContactInfoBlock = z.infer<typeof contactInfoBlockSchema>;
export type ContactPageContent = z.infer<typeof contactPageContentSchema>;
