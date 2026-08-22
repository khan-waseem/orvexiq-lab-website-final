import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceDetailSection } from '@/components/sections/ServiceDetailSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { LandingFaqSection } from '@/components/sections/LandingFaqSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

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
 * Services page.
 *
 * Section order: Page Hero -> Service Detail -> Selected Work -> FAQ -> CTA.
 *
 * The proof strip is the landing's own component fed from the homepage
 * content rather than a copy, so the two stay in step. The process band was
 * deliberately left off: it would repeat the landing's verbatim.
 */
export default async function ServicesPage() {
  const [servicesPageData, homepageData, caseStudies, caseStudyDetails] = await Promise.all([
    contentRepository.getServicesPageData(),
    contentRepository.getHomepageData(),
    contentRepository.getCaseStudies(),
    contentRepository.getCaseStudyDetails(),
  ]);

  const featuredCaseStudies = caseStudies.filter((study) => study.featured && study.published);
  const readableSlugs = caseStudyDetails.map((detail) => detail.slug);

  return (
    <>
      <PageHero
        id="services-hero"
        eyebrow={servicesPageData.hero.eyebrow}
        headline={servicesPageData.hero.headline}
        subdescription={servicesPageData.hero.subdescription}
        videoSrc="/assets/video/services.mp4"
      />

      <ServiceDetailSection blocks={servicesPageData.serviceDetail.blocks} />

      {/* Shorter proof strip than the landing's 2x2 — enough to show the work
          without turning the services page into a case-study index. */}
      <SelectedWorkSection
        content={homepageData.selectedWorkSection}
        caseStudies={featuredCaseStudies}
        readableSlugs={readableSlugs}
        limit={2}
      />

      <LandingFaqSection content={servicesPageData.faq} />

      <LandingCtaSection content={servicesPageData.ctaSection} />
    </>
  );
}
