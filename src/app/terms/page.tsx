import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { LegalPageSection } from '@/components/sections/LegalPageSection';

export async function generateMetadata(): Promise<Metadata> {
  const page = await contentRepository.getLegalPageBySlug('terms');
  return {
    title: page?.seo?.title || 'Terms & Conditions',
    description: page?.seo?.description,
  };
}

/** Terms & Conditions — Figma node 37:2. Shares the legal template with Privacy. */
export default async function TermsPage() {
  const page = await contentRepository.getLegalPageBySlug('terms');
  if (!page) notFound();
  return <LegalPageSection page={page} />;
}
