import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { CaseStudiesHeroSection } from '@/components/sections/CaseStudiesHeroSection';
import { CaseGridSection } from '@/components/sections/CaseGridSection';
import { CtaSection } from '@/components/sections/CtaSection';

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
 * Case Studies page — Figma node 44:2.
 *
 * Section order matches the Figma frame:
 *   Page Hero (183:795) -> Case Grid (44:24)
 *   -> CTA (44:107, boxed variant) -> Footer (44:120, global)
 */
export default async function CaseStudiesPage() {
  const [pageData, caseStudies] = await Promise.all([
    contentRepository.getCaseStudiesPageData(),
    contentRepository.getCaseStudies(),
  ]);

  return (
    <>
      <CaseStudiesHeroSection content={pageData.hero} />

      <CaseGridSection content={pageData.grid} caseStudies={caseStudies} />

      <CtaSection content={pageData.ctaSection} variant="boxed" />
    </>
  );
}
