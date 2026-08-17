import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { AboutHeroSection } from '@/components/sections/AboutHeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { CtaSection } from '@/components/sections/CtaSection';

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
 * Section order matches the Figma frame:
 *   Page Hero (183:517) -> Story (32:24) -> Principles (32:34)
 *   -> Impact (32:49) -> CTA (32:69, boxed) -> Footer (32:82, global)
 *
 * Figma 32:49 is the same Impact band as the homepage (86:947), so the
 * homepage ImpactSection is reused verbatim — including its rule that
 * unverified metrics render as placeholders rather than numbers.
 */
export default async function AboutPage() {
  const [pageData, impactStats] = await Promise.all([
    contentRepository.getAboutPageData(),
    contentRepository.getImpactStats(),
  ]);

  return (
    <>
      <AboutHeroSection content={pageData.hero} />

      <StorySection content={pageData.story} />

      <PrinciplesSection content={pageData.principles} />

      <ImpactSection stats={impactStats} />

      <CtaSection content={pageData.ctaSection} variant="boxed" />
    </>
  );
}
