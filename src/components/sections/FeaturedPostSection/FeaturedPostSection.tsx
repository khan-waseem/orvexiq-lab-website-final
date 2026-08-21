import React from 'react';
import Image from 'next/image';
import { PostCover } from '@/components/sections/PostGridSection/PostCover';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { PageContainer } from '@/components/layout/Container';
import { BlogPostItem } from '@/content/schemas/blog.schema';
import { BlogPageContent } from '@/content/schemas/blog-page.schema';
import { formatPostDate } from '../PostGridSection/formatPostDate';
import styles from './FeaturedPostSection.module.css';

export interface FeaturedPostSectionProps {
  content: BlogPageContent['featured'];
  post: BlogPostItem | null;
}

/**
 * FeaturedPostSection — Figma node 64:23 (Page / Blog / Section / Featured Post)
 *
 * 1440 reference (section height 571):
 *   eyebrow y=32 -> card y=71 (1248x436)
 *   card: padding 48, gap 64, image 544x340 | info 544
 *   info: meta(13px) +16 title(36/44) +16 excerpt(17/28) +16 read-more(15px)
 *
 * Renders nothing when no post is flagged featured, so the band cannot appear
 * empty.
 */
export const FeaturedPostSection: React.FC<FeaturedPostSectionProps> = ({ content, post }) => {
  if (!post) return null;

  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="featured-post"
      className={styles.section}
      ariaLabelledBy="featured-post-heading"
    >
      <GlowRings side="left" size={960} />
      <GlowRings side="right" size={840} />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="featured-post-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          align="left"
          className={styles.heading}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <article className={styles.card}>
          <div className={styles.image}>
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 544px"
                className={styles.imageAsset}
              />
            ) : (
              <PostCover category={post.category} title={post.title} />
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.meta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>{formatPostDate(post.publishedAt)}</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>{post.readTimeMinutes} min read</span>
            </p>

            <h2 className={styles.title}>
              <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                {post.title}
              </Link>
            </h2>

            <p className={styles.excerpt}>{post.excerpt}</p>

            <Link href={`/blog/${post.slug}`} className={styles.readMore} tabIndex={-1}>
              <span>{content.readMoreLabel}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </PageContainer>
    </SectionWrapper>
  );
};
