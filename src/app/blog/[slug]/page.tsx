import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sections } from '@/lib/site';
import { contentRepository } from '@/content/repository/local-content-provider';
import {
  ArticleHeaderSection,
  ArticleImageSection,
  ArticleBodySection,
  AuthorBioSection,
  RelatedPostsSection,
} from '@/components/sections/ArticleSections';
import { LandingCtaSection } from '@/components/sections/LandingCtaSection';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (!sections.blog) return [];
  const posts = await contentRepository.getBlogPosts();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await contentRepository.getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo?.title || `${post.title} — Orvexiq Lab`,
    description: post.seo?.description || post.excerpt,
  };
}

/**
 * Blog post page — Figma node 64:158.
 *
 * Article Header -> Article Image -> Article Body -> Author Bio
 * -> Related Posts -> CTA (boxed) -> Footer
 *
 * Only the featured post has an article written in Figma; the other index
 * entries render the same template with an empty body rather than inventing
 * prose, and ArticleBodySection returns null in that case.
 */
export default async function BlogPostPage({ params }: Params) {
  if (!sections.blog) notFound();

  const { slug } = await params;
  const [post, pageData, allPosts] = await Promise.all([
    contentRepository.getBlogPostBySlug(slug),
    contentRepository.getBlogPageData(),
    contentRepository.getBlogPosts(),
  ]);

  if (!post || !post.published) notFound();

  const related = allPosts
    .filter((p) => p.published && p.id !== post.id)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 3);

  return (
    <>
      <ArticleHeaderSection post={post} />

      <ArticleImageSection post={post} />

      <ArticleBodySection post={post} />

      <AuthorBioSection post={post} />

      <RelatedPostsSection posts={related} label="KEEP READING" />

      <LandingCtaSection content={pageData.ctaSection} />
    </>
  );
}
