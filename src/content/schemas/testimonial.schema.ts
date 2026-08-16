import { z } from 'zod';
import { verificationMetadataSchema } from './common.schema';

export const testimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  authorName: z.string(),
  authorRole: z.string(),
  clientCompanyProfile: z.string(),
  avatarAssetUrl: z.string(),
  verification: verificationMetadataSchema.default({ isVerified: false }),
  published: z.boolean().default(true),
});

export type TestimonialData = z.infer<typeof testimonialSchema>;
