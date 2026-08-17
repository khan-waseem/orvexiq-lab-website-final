import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { CareersHeroSection } from '@/components/sections/CareersHeroSection';
import { WhyUsSection, OpenRolesSection } from '@/components/sections/CareersSections';
import { CtaSection } from '@/components/sections/CtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const page = await contentRepository.getCareersPageData();
  return { title: page.seo?.title || 'Careers — Orvexiq Lab', description: page.seo?.description };
}

/**
 * Careers page — Figma node 35:2.
 *   Page Hero (183:643) -> Why Us (35:24) -> Open Roles (35:42)
 *   -> CTA (35:85, boxed) -> Footer (35:98, global)
 */
export default async function CareersPage() {
  const [page, roles] = await Promise.all([
    contentRepository.getCareersPageData(),
    contentRepository.getJobRoles(),
  ]);

  return (
    <>
      <CareersHeroSection content={page.hero} />
      <WhyUsSection content={page.whyUs} />
      <OpenRolesSection content={page.openRoles} roles={roles} />
      <CtaSection content={page.ctaSection} variant="boxed" />
    </>
  );
}
