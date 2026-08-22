import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { CaseStudyChapters } from '@/components/sections/CaseStudyChapters';

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

/**
 * Case study detail — one screen per chapter.
 *
 * The previous layout stacked thirteen text blocks, which read as a document
 * a visitor had to work through. Each chapter now carries one idea and one
 * diagram, so the problem and what was built land on the way past.
 *
 * No closing CTA band: the page already ends on what the work amounts to, and
 * the site-wide footer carries the way to get in touch.
 */
export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = await contentRepository.getCaseStudyDetailBySlug(slug);
  if (!page) notFound();

  return <CaseStudyChapters study={page} />;
}
