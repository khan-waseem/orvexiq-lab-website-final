import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { CaseStudyDetailSection } from '@/components/sections/CaseStudyDetailSection';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await contentRepository.getCaseStudyDetails();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await contentRepository.getCaseStudyDetailBySlug(slug);
  if (!page) return {};
  return { title: page.seo?.title, description: page.seo?.description };
}

/** Case Study detail — Figma nodes 149:2 / 159:2 / 171:2. */
export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = await contentRepository.getCaseStudyDetailBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <CaseStudyDetailSection page={page} />
      <LandingCtaSection content={page.ctaSection} />
    </>
  );
}
