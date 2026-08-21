import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { StorySection } from '@/components/sections/StorySection';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await contentRepository.getAboutPageData();
  return {
    title: pageData.seo?.title || 'About — Orvexiq Lab',
    description:
      pageData.seo?.description ||
      'A product studio that builds design systems and enterprise products for operationally complex businesses.',
  };
}

/**
 * About page — Figma node 32:2.
 *
 * Section order: Page Hero -> Story -> Principles -> CTA -> Footer.
 *
 * The Impact band was dropped in the premium pass: its metrics are
 * unverified, so it only ever rendered placeholder dashes.
 */
export default async function AboutPage() {
  const pageData = await contentRepository.getAboutPageData();

  return (
    <>
      <PageHero
        id="about-hero"
        eyebrow={pageData.hero.eyebrow}
        headline={pageData.hero.headline}
        subdescription={pageData.hero.subdescription}
        iconAssetUrl={pageData.hero.heroIconAssetUrl}
      />

      <StorySection content={pageData.story} />

      <PrinciplesSection content={pageData.principles} />

      <LandingCtaSection content={pageData.ctaSection} />
    </>
  );
}
