import type { MetadataRoute } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { sections, siteUrl } from '@/lib/site';

/**
 * Sitemap built from the content repository rather than a hand-kept list, so a
 * new service, role or case study appears without anyone remembering to add it
 * here — and, more importantly, an unpublished post or an unwritten case study
 * never gets submitted as a URL that 404s.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudyDetails, posts, roles] = await Promise.all([
    contentRepository.getServiceDetailPages(),
    contentRepository.getCaseStudyDetails(),
    contentRepository.getBlogPosts(),
    contentRepository.getJobRoles(),
  ]);

  const url = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    priority,
  });

  return [
    url('/', 1),
    url('/services', 0.9),
    url('/case-studies', 0.9),
    url('/about', 0.7),

    url('/contact', 0.8),
    url('/privacy', 0.2),
    url('/terms', 0.2),
    ...services.map((s) => url(`/services/${s.slug}`, 0.8)),
    ...caseStudyDetails.map((c) => url(`/case-studies/${c.slug}`, 0.8)),
    ...(sections.blog
      ? [url('/blog', 0.6), ...posts.filter((p) => p.published).map((p) => url(`/blog/${p.slug}`, 0.5))]
      : []),
    ...(sections.careers
      ? [url('/careers', 0.6), ...roles.map((r) => url(`/careers/${r.slug}`, 0.4))]
      : []),
  ];
}
