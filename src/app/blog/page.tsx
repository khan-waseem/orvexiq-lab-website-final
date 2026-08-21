import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { FeaturedPostSection } from '@/components/sections/FeaturedPostSection';
import { PostGridSection } from '@/components/sections/PostGridSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

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
 * Blog page.
 *
 * Section order: Page Hero -> Featured Post -> Filters + Post Grid
 * -> Newsletter -> CTA -> Footer.
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
      <PageHero
        id="blog-hero"
        eyebrow={pageData.hero.eyebrow}
        headline={pageData.hero.headline}
        subdescription={pageData.hero.subdescription}
        iconAssetUrl={pageData.hero.heroIconAssetUrl}
      />

      <FeaturedPostSection content={pageData.featured} post={featured} />

      <PostGridSection content={pageData.grid} posts={gridPosts} />

      <NewsletterSection content={pageData.newsletter} />

      <LandingCtaSection content={pageData.ctaSection} />
    </>
  );
}
