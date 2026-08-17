import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { ServicesHeroSection } from '@/components/sections/ServicesHeroSection';
import { ServiceDetailSection } from '@/components/sections/ServiceDetailSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const servicesPageData = await contentRepository.getServicesPageData();
  return {
    title: servicesPageData.seo?.title || 'Services — Orvexiq Lab',
    description:
      servicesPageData.seo?.description ||
      'Product strategy, UX/UI product design, design systems and AI experiences for complex enterprise software.',
  };
}

/**
 * Services page — Figma node 30:4.
 *
 * Section order matches the Figma frame:
 *   Page Hero (30:18) -> Service Detail (31:2) -> FAQ (123:2)
 *   -> CTA (31:77, boxed variant) -> Footer (31:90, global)
 */
export default async function ServicesPage() {
  const servicesPageData = await contentRepository.getServicesPageData();

  return (
    <>
      <ServicesHeroSection content={servicesPageData.hero} />

      <ServiceDetailSection blocks={servicesPageData.serviceDetail.blocks} />

      <FaqSection content={servicesPageData.faq} />

      {/* Figma 31:78 is the inset/bordered CTA card, not the homepage band */}
      <CtaSection content={servicesPageData.ctaSection} variant="boxed" />
    </>
  );
}
