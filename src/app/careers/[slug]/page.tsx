import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepository } from '@/content/repository/local-content-provider';
import { JobDetailSection } from '@/components/sections/JobDetailSection';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const roles = await contentRepository.getJobRoles();
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = await contentRepository.getJobRoleBySlug(slug);
  if (!role) return {};
  return {
    title: `${role.title} — Careers — Orvexiq Lab`,
    description: role.summary,
  };
}

/** Job Detail — Figma node 38:4. */
export default async function JobDetailPage({ params }: Params) {
  const { slug } = await params;
  const role = await contentRepository.getJobRoleBySlug(slug);
  if (!role || !role.open) notFound();
  return <JobDetailSection role={role} />;
}
