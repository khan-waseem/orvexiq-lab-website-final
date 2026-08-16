import { z } from 'zod';

/**
 * Verification Metadata Schema
 * Factual/claim-based content (Impact metrics, client quotes) MUST include verification flags.
 * If isVerified is false, the content will NOT be published as a live factual claim.
 */
export const verificationMetadataSchema = z.object({
  isVerified: z.boolean().default(false),
  verificationNotes: z.string().optional(),
  verifiedAt: z.string().optional(),
});

export type VerificationMetadata = z.infer<typeof verificationMetadataSchema>;

/**
 * SEO Metadata Schema
 * Reusable metadata schema for all pages and dynamic content items.
 */
export const seoMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});

export type SeoMetadata = z.infer<typeof seoMetadataSchema>;
