import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  contentMarkdown: z.string(),
  authorName: z.string(),
  authorRole: z.string().optional(),
  authorAvatarUrl: z.string().optional(),
  category: z.string(),
  readTimeMinutes: z.number().default(5),
  publishedAt: z.string(),
  published: z.boolean().default(true),
  seo: seoMetadataSchema.optional(),
});

export type BlogPostItem = z.infer<typeof blogPostSchema>;
