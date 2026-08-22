import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/** Everything is public; the only thing worth stating is where the map is. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
