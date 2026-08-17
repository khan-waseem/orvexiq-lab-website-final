import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { BlogHeroSection } from '@/components/sections/BlogHeroSection';
import { FeaturedPostSection } from '@/components/sections/FeaturedPostSection';
import { PostGridSection } from '@/components/sections/PostGridSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { CtaSection } from '@/components/sections/CtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await contentRepository.getBlogPageData();
  return {
    title: pageData.seo?.title || 'Blog — Orvexiq Lab',
    description:
      pageData.seo?.description ||
      'Notes on design systems, product design and research from the team doing the work.',
  };
}

/**
 * Blog page — Figma node 64:2.
 *
 * Section order matches the Figma frame:
 *   Page Hero (183:974) -> Featured Post (64:23) -> Filters + Post Grid
 *   (64:38 / 64:50) -> Newsletter (64:103) -> CTA (64:112, boxed) -> Footer
 */
export default async function BlogPage() {
  const [pageData, posts] = await Promise.all([
    contentRepository.getBlogPageData(),
    contentRepository.getBlogPosts(),
  ]);

  const featured = posts.find((p) => p.featured && p.published) ?? null;
  const gridPosts = posts.filter((p) => p.id !== featured?.id);

  return (
    <>
      <BlogHeroSection content={pageData.hero} />

      <FeaturedPostSection content={pageData.featured} post={featured} />

      <PostGridSection content={pageData.grid} posts={gridPosts} />

      <NewsletterSection content={pageData.newsletter} />

      <CtaSection content={pageData.ctaSection} variant="boxed" />
    </>
  );
}
