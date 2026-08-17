import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { LegalPageSection } from '@/components/sections/LegalPageSection';

export async function generateMetadata(): Promise<Metadata> {
  const page = await contentRepository.getLegalPageBySlug('privacy');
  return {
    title: page?.seo?.title || 'Privacy Policy',
    description: page?.seo?.description,
  };
}

/** Privacy Policy — Figma node 36:2. Shares the legal template with Terms. */
export default async function PrivacyPage() {
  const page = await contentRepository.getLegalPageBySlug('privacy');
  if (!page) notFound();
  return <LegalPageSection page={page} />;
}
