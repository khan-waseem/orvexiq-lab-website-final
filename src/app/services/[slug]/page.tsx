import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { ServiceDetailHeroSection } from '@/components/sections/ServiceDetailHeroSection';
import { ServiceWhySection } from '@/components/sections/ServiceWhySection';
import { ServiceIncludesSection } from '@/components/sections/ServiceIncludesSection';
import { ServiceAuditOfferSection } from '@/components/sections/ServiceAuditOfferSection';
import { ServiceDeliverablesSection } from '@/components/sections/ServiceDeliverablesSection';
import { RelatedWorkSection } from '@/components/sections/RelatedWorkSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await contentRepository.getServiceDetailPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await contentRepository.getServiceDetailBySlug(slug);
  if (!page) return {};
  return {
    title: page.seo?.title || `${page.breadcrumbLabel} — Orvexiq Lab`,
    description: page.seo?.description || page.hero.subdescription,
  };
}

/**
 * Service detail page — Figma nodes 124:2 / 124:168 / 124:334 / 139:2.
 *
 * All four share one section order:
 *   Page Hero -> Why -> Includes -> [Audit Offer] -> Deliverables
 *   -> Related Work -> FAQ -> CTA (boxed) -> Footer
 *
 * Audit Offer appears only on Design Systems (139:71), so it is optional in
 * the schema. The FAQ reuses the Services page component.
 */
export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = await contentRepository.getServiceDetailBySlug(slug);

  if (!page) notFound();

  return (
    <>
      <ServiceDetailHeroSection hero={page.hero} breadcrumbLabel={page.breadcrumbLabel} />

      <ServiceWhySection content={page.why} />

      <ServiceIncludesSection content={page.includes} />

      {page.auditOffer ? <ServiceAuditOfferSection content={page.auditOffer} /> : null}

      <ServiceDeliverablesSection content={page.deliverables} />

      <RelatedWorkSection content={page.relatedWork} />

      <FaqSection content={page.faq} />

      <CtaSection content={page.ctaSection} variant="boxed" />
    </>
  );
}
