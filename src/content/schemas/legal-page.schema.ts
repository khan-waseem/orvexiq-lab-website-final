import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const legalSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()),
});

export const legalPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  lastUpdated: z.string(),
  sections: z.array(legalSectionSchema),
  seo: seoMetadataSchema.optional(),
});

export const legalPageCollectionSchema = z.array(legalPageSchema);

export type LegalSection = z.infer<typeof legalSectionSchema>;
export type LegalPage = z.infer<typeof legalPageSchema>;
