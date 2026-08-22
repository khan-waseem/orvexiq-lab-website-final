/**
 * Absolute origin for canonical URLs, social cards and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment. Without an absolute
 * base Next cannot resolve share URLs, and every link shared to LinkedIn or
 * WhatsApp falls back to a bare card with no title or image.
 *
 * Kept out of layout.tsx: Next rejects any export from a layout other than the
 * ones it defines.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orvexiqlabs.com';

/**
 * Sections that are built but not yet public.
 *
 * Blog, Careers and the newsletter signup all depend on content that is still
 * being written, and on a CMS that does not exist yet. Rather than ship them
 * thin — one article, roles nobody is hiring for, a list nobody sends to —
 * they are switched off in one place.
 *
 * Turning a flag back to `true` restores everything at once: the nav link, the
 * footer link, the sitemap entries and the routes themselves. Nothing else has
 * to be remembered.
 *
 * Disabled routes return 404 rather than merely dropping out of the nav, so a
 * shared or guessed URL cannot reach an unfinished page.
 */
export const sections = {
  blog: false,
  careers: false,
  newsletter: false,
} as const;
