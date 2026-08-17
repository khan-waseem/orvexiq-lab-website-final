'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { BlogPostItem } from '@/content/schemas/blog.schema';
import { BlogPageContent } from '@/content/schemas/blog-page.schema';
import { formatPostDate } from './formatPostDate';
import styles from './PostGridSection.module.css';

export interface PostGridSectionProps {
  content: BlogPageContent['grid'];
  posts: BlogPostItem[];
}

/**
 * PostGridSection — Figma nodes 64:38 (Filters) + 64:50 (Post Grid)
 *
 * 1440 reference:
 *   filters 107 tall (pills at y=32), grid 1114 tall
 *   card 400x475: padding 32, gap 16, image 336x180 (r16)
 *   3 columns with 24px gutters
 *
 * Figma draws the pill row as a static active state; here it filters for real.
 */
export const PostGridSection: React.FC<PostGridSectionProps> = ({ content, posts }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      posts
        .filter((p) => p.published)
        .filter((p) => activeFilter === null || p.category === activeFilter)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [posts, activeFilter]
  );

  return (
    <SectionWrapper theme="canvas" padding="custom" id="post-grid" className={styles.section}>
      <PageContainer>
        <div className={styles.pills} role="group" aria-label="Filter posts by category">
          {content.filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.id}
                type="button"
                className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className={styles.empty} aria-live="polite">
            {content.emptyLabel}
          </p>
        ) : (
          <ul className={styles.grid}>
            {visible.map((post) => (
              <li key={post.id} className={styles.gridItem}>
                <article className={styles.card}>
                  <div className={styles.image}>
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 100vw, 336px"
                        className={styles.imageAsset}
                      />
                    ) : (
                      <span className={styles.imagePlaceholder}>
                        {content.imagePlaceholderLabel}
                      </span>
                    )}
                  </div>

                  <p className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.dot} aria-hidden="true">·</span>
                    <span>{post.readTimeMinutes} min</span>
                  </p>

                  <h2 className={styles.title}>
                    <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className={styles.excerpt}>{post.excerpt}</p>

                  <p className={styles.date}>{formatPostDate(post.publishedAt)}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </SectionWrapper>
  );
};
