import { Metadata } from 'next';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { ContactBodySection } from '@/components/sections/ContactBodySection';
import { ContactMapSection } from '@/components/sections/ContactMapSection';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await contentRepository.getContactPageData();
  return {
    title: pageData.seo?.title || 'Contact — Orvexiq Lab',
    description:
      pageData.seo?.description ||
      'Tell us what you are building. We reply within two working days with a real response.',
  };
}

/**
 * Contact page — Figma node 33:6.
 *
 * Section order matches the Figma frame:
 *   Page Hero (183:596) -> Contact Body (33:28) -> Footer (33:67, global)
 *
 * Note there is no CTA band on this page — the form is the call to action.
 */
export default async function ContactPage() {
  const pageData = await contentRepository.getContactPageData();

  return (
    <>
      <PageHero
        id="contact-hero"
        eyebrow={pageData.hero.eyebrow}
        headline={pageData.hero.headline}
        subdescription={pageData.hero.subdescription}
        iconAssetUrl={pageData.hero.heroIconAssetUrl}
      />

      <ContactBodySection form={pageData.form} info={pageData.info} />

      <ContactMapSection content={pageData.map} />
    </>
  );
}
