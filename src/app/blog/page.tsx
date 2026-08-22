import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sections } from '@/lib/site';
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
  if (!sections.blog) notFound();

  const [pageData, posts] = await Promise.all([
    contentRepository.getBlogPageData(),
    contentRepository.getBlogPosts(),
  ]);

  /* The grid filtered on nothing, so drafts appeared in the list and then
     404'd — /blog/[slug] has always required `published`. Both now agree. */
  const livePosts = posts.filter((p) => p.published);
  const featured = livePosts.find((p) => p.featured) ?? null;
  const gridPosts = livePosts.filter((p) => p.id !== featured?.id);

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
