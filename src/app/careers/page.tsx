import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sections } from '@/lib/site';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { WhyUsSection, OpenRolesSection } from '@/components/sections/CareersSections';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const page = await contentRepository.getCareersPageData();
  return { title: page.seo?.title || 'Careers — Orvexiq Lab', description: page.seo?.description };
}

/**
 * Careers page.
 *
 * Section order: Page Hero -> Why Us -> Open Roles -> CTA -> Footer.
 */
export default async function CareersPage() {
  if (!sections.careers) notFound();

  const [page, roles] = await Promise.all([
    contentRepository.getCareersPageData(),
    contentRepository.getJobRoles(),
  ]);

  return (
    <>
      <PageHero
        id="careers-hero"
        eyebrow={page.hero.eyebrow}
        headline={page.hero.headline}
        subdescription={page.hero.subdescription}
        iconAssetUrl={page.hero.heroIconAssetUrl}
      />
      <WhyUsSection content={page.whyUs} />
      <OpenRolesSection content={page.openRoles} roles={roles} />
      <LandingCtaSection content={page.ctaSection} />
    </>
  );
}
