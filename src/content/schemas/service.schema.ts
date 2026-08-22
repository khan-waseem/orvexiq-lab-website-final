import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const serviceCapabilitySchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const serviceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string().optional(),
  capabilities: z.array(serviceCapabilitySchema),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
  seo: seoMetadataSchema.optional(),
});

export type ServiceCapability = z.infer<typeof serviceCapabilitySchema>;
export type ServiceItem = z.infer<typeof serviceSchema>;
