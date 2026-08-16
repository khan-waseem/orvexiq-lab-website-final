import { z } from 'zod';
import { verificationMetadataSchema } from './common.schema';

export const impactStatSchema = z.object({
  id: z.string(),
  rawNumericValue: z.string(),
  displayLabel: z.string(),
  verification: verificationMetadataSchema.default({ isVerified: false }),
  displayOrder: z.number().default(0),
});

export type ImpactStatItem = z.infer<typeof impactStatSchema>;
