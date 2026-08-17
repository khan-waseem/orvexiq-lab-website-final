import { contentRepository } from '@/content/repository/local-content-provider';
import { NotFoundSection } from '@/components/sections/NotFoundSection';

/**
 * 404 page — Figma node 54:2.
 *
 * Lives at app/not-found.tsx so Next.js serves it for every unmatched route
 * and for any `notFound()` call, rather than as a routable /404 page.
 * The global Navbar and Footer come from the root layout.
 */
export default async function NotFound() {
  const content = await contentRepository.getNotFoundPageData();
  return <NotFoundSection content={content} />;
}
