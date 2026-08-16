import { contentRepository } from '@/content/repository/local-content-provider';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { SystemSection } from '@/components/sections/SystemSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';

export default async function HomePage() {
  const [homepageData, featuredCaseStudies, services, impactStats, testimonials] = await Promise.all([
    contentRepository.getHomepageData(),
    contentRepository.getFeaturedCaseStudies(),
    contentRepository.getServices(),
    contentRepository.getImpactStats(),
    contentRepository.getTestimonials(),
  ]);

  return (
    <>
      {/* Phase 5A: Hero Section */}
      <HeroSection content={homepageData.hero} />

      {/* Phase 5B: Sectors Section */}
      <SectorsSection content={homepageData.sectorsSection} />

      {/* Phase 5C: System Section */}
      <SystemSection content={homepageData.systemSection} />

      {/* Phase 5D: Selected Work Section */}
      <SelectedWorkSection
        content={homepageData.selectedWorkSection}
        caseStudies={featuredCaseStudies}
      />

      {/* Phase 5E: Services Section */}
      <ServicesSection
        content={homepageData.servicesSection}
        services={services}
      />

      {/* Phase 5F: Approach / Process Section */}
      <ApproachSection content={homepageData.approachSection} />

      {/* Phase 5G: Impact Stats Section */}
      <ImpactSection stats={impactStats} />

      {/* Phase 5H: Testimonial Section */}
      <TestimonialSection testimonials={testimonials} />
    </>
  );
}
