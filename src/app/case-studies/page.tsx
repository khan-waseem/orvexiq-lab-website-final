import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { CaseGridSection } from '@/components/sections/CaseGridSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await contentRepository.getCaseStudiesPageData();
  return {
    title: pageData.seo?.title || 'Case Studies — Orvexiq Lab',
    description:
      pageData.seo?.description ||
      'Enterprise product work in lending, logistics, commerce and AI.',
  };
}

/**
 * Case Studies page.
 *
 * Section order: Page Hero -> Case Grid -> CTA -> Footer.
 */
export default async function CaseStudiesPage() {
  const [pageData, caseStudies, details] = await Promise.all([
    contentRepository.getCaseStudiesPageData(),
    contentRepository.getCaseStudies(),
    contentRepository.getCaseStudyDetails(),
  ]);

  /* Only these have a written detail page; the grid keeps the rest as plain
     cards so no card on this page can lead to a 404. */
  const readableSlugs = details.map((detail) => detail.slug);

  return (
    <>
      <PageHero
        id="case-studies-hero"
        eyebrow={pageData.hero.eyebrow}
        headline={pageData.hero.headline}
        subdescription={pageData.hero.subdescription}
        iconAssetUrl={pageData.hero.heroIconAssetUrl}
      />

      <CaseGridSection
        content={pageData.grid}
        caseStudies={caseStudies}
        readableSlugs={readableSlugs}
      />

      <LandingCtaSection content={pageData.ctaSection} />
    </>
  );
}
