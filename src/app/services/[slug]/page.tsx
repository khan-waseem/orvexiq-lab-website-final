import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { PageHero } from '@/components/sections/PageHero';
import { DisciplineMedallion, type DisciplineId } from '@/components/primitives/DisciplineMedallion';
import { ServiceWhySection } from '@/components/sections/ServiceWhySection';
import { ServiceIncludesSection } from '@/components/sections/ServiceIncludesSection';
import { ServiceAuditOfferSection } from '@/components/sections/ServiceAuditOfferSection';
import { ServiceDeliverablesSection } from '@/components/sections/ServiceDeliverablesSection';
import { RelatedWorkSection } from '@/components/sections/RelatedWorkSection';
import { LandingFaqSection } from '@/components/sections/LandingFaqSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

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
/* The landing's four discipline cards each open one of these pages, and the
   hero shows the same medallion the card did — the two vocabularies do not
   share a name (Technology is served by Design Systems), so the pairing is
   spelled out. A service added without an entry here simply shows no mark,
   which is visible immediately rather than silently wrong. */
const MEDALLION_BY_SLUG: Record<string, DisciplineId> = {
  'product-strategy': 'strategy',
  'ux-ui-product-design': 'product-design',
  'design-systems': 'technology',
  'ai-experiences-automation': 'intelligence',
};

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = await contentRepository.getServiceDetailBySlug(slug);

  if (!page) notFound();

  const medallion = MEDALLION_BY_SLUG[slug];

  return (
    <>
      <PageHero
        id="service-hero"
        eyebrow={page.hero.eyebrow}
        headline={page.hero.headline}
        subdescription={page.hero.subdescription}
        icon={medallion ? <DisciplineMedallion discipline={medallion} size="lg" /> : undefined}
      />

      <ServiceWhySection content={page.why} />

      <ServiceIncludesSection content={page.includes} />

      {page.auditOffer ? <ServiceAuditOfferSection content={page.auditOffer} /> : null}

      <ServiceDeliverablesSection content={page.deliverables} />
      {page.relatedWork && <RelatedWorkSection content={page.relatedWork} />}

      <LandingFaqSection content={page.faq} />

      <LandingCtaSection content={page.ctaSection} />
    </>
  );
}
