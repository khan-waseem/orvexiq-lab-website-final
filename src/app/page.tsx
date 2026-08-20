import { contentRepository } from '@/content/repository/local-content-provider';
import { HeroSection } from '@/components/sections/HeroSection';
import { DesignSystemsSection } from '@/components/sections/DesignSystemsSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { WhatWeBuildSection } from '@/components/sections/WhatWeBuildSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { LandingFaqSection } from '@/components/sections/LandingFaqSection';
import { ClientStoriesSection } from '@/components/sections/ClientStoriesSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

/**
 * Landing page — rebuilt against the current Figma landing frame (86:694).
 *
 * The redesign drops the Sectors, Services grid and Impact bands; those
 * components still exist and are used by other pages, they are simply no
 * longer part of this composition. Sections still marked "legacy" below are
 * the previous build, being replaced one at a time.
 */
export default async function HomePage() {
  const [homepageData, featuredCaseStudies, testimonials] = await Promise.all([
    contentRepository.getHomepageData(),
    contentRepository.getFeaturedCaseStudies(),
    contentRepository.getTestimonials(),
  ]);

  /*
   * Client Stories runs on the published flag. The quote currently in
   * testimonials.json is an anonymised placeholder (no named person, no named
   * client) and is still marked unverified — replace it with a real, approved
   * quote before launch, or unset `published` to hide the band again.
   */
  const publishableTestimonials = testimonials.filter((t) => t.published);

  return (
    <>
      {/* Hero — copy left, looping product animation right (183:4) */}
      <HeroSection content={homepageData.hero} />

      {/* Design Systems — tokens / components / product pillars */}
      <DesignSystemsSection content={homepageData.designSystemsSection} />

      {/* Selected Work — 2x2 case grid */}
      <SelectedWorkSection
        content={homepageData.selectedWorkSection}
        caseStudies={featuredCaseStudies}
      />

      {/* What we build — four disciplines on one connector thread */}
      <WhatWeBuildSection content={homepageData.whatWeBuildSection} />

      {/* Our Process — four stages, left to right */}
      <ApproachSection content={homepageData.approachSection} />

      {/* FAQ — numbered accordion */}
      <LandingFaqSection content={homepageData.faqSection} />

      {/* Client Stories — quote carousel; renders only when a verified,
          published testimonial exists (the repo marks the current quote
          [PLACEHOLDER], so nothing shows until a real one lands) */}
      <ClientStoriesSection
        content={homepageData.clientStoriesSection}
        testimonials={publishableTestimonials}
      />

      {/* CTA — oversized panel with light raking in from the corners */}
      <LandingCtaSection content={homepageData.landingCtaSection} />
    </>
  );
}
