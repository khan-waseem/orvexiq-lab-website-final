import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

/**
 * Article body as structured blocks rather than raw markdown: it keeps the
 * renderer typed and avoids pulling in a markdown parser for the handful of
 * block kinds the Figma article template actually uses (64:191).
 */
export const articleBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('lead'), text: z.string() }),
  z.object({ type: z.literal('paragraph'), text: z.string() }),
  z.object({ type: z.literal('heading'), text: z.string() }),
  z.object({ type: z.literal('quote'), text: z.string() }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({ type: z.literal('figure'), placeholder: z.string(), caption: z.string() }),
]);

export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  contentMarkdown: z.string(),
  authorName: z.string(),
  authorRole: z.string().optional(),
  authorBio: z.string().optional(),
  authorAvatarUrl: z.string().optional(),
  /** Empty for index-only posts whose article has not been written yet. */
  body: z.array(articleBlockSchema).default([]),
  category: z.string(),
  /** Marks the single post shown in the Featured Post band (Figma 64:23) */
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  /** Cover image; empty renders the Figma gradient placeholder */
  coverImageUrl: z.string().default(''),
  readTimeMinutes: z.number().default(5),
  publishedAt: z.string(),
  published: z.boolean().default(true),
  seo: seoMetadataSchema.optional(),
});

export type ArticleBlock = z.infer<typeof articleBlockSchema>;
export type BlogPostItem = z.infer<typeof blogPostSchema>;
