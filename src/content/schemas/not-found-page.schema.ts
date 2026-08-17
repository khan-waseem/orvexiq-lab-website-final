import { z } from 'zod';

export const notFoundLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  href: z.string(),
});

export const notFoundPageContentSchema = z.object({
  code: z.string(),
  headline: z.string(),
  subdescription: z.string(),
  primaryCta: z.object({ label: z.string(), href: z.string() }),
  secondaryCta: z.object({ label: z.string(), href: z.string() }),
  linksLabel: z.string(),
  links: z.array(notFoundLinkSchema),
  heroIconAssetUrl: z.string(),
});

export type NotFoundLink = z.infer<typeof notFoundLinkSchema>;
export type NotFoundPageContent = z.infer<typeof notFoundPageContentSchema>;
