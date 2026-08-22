import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { BlogPostItem } from '@/content/schemas/blog.schema';
import { formatPostDate } from '../PostGridSection/formatPostDate';
import styles from './ArticleSections.module.css';

/**
 * Blog Post sections — Figma node 64:158.
 *
 * Article Header (64:172) / Article Image (64:188) / Article Body (64:191)
 * / Author Bio (64:226) / Related Posts (64:232).
 *
 * They share one stylesheet because they are one continuous reading column
 * (720px measure, centred) rather than independent page furniture.
 */

export interface ArticleHeaderProps {
  post: BlogPostItem;
}

export const ArticleHeaderSection: React.FC<ArticleHeaderProps> = ({ post }) => (
  <SectionWrapper theme="canvas" padding="custom" id="article-header" className={styles.headerSection}>
    <div className={styles.headerGlow} aria-hidden="true" />
    <GlowRings side="left" size={960} />
    <GlowRings side="right" size={840} />
    <PageContainer className={styles.container}>
      <div className={styles.measure}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.standfirst}>{post.excerpt}</p>

        <div className={styles.byline}>
          <span className={styles.avatar} aria-hidden="true" />
          <span className={styles.bylineText}>
            <span className={styles.authorName}>{post.authorName}</span>
            <span className={styles.bylineMeta}>
              {[post.authorRole, formatPostDate(post.publishedAt), `${post.readTimeMinutes} min read`]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </span>
        </div>
      </div>
    </PageContainer>
  </SectionWrapper>
);

export interface ArticleImageProps {
  post: BlogPostItem;
  /** Retained so the call site keeps compiling; no longer rendered. */
  placeholderLabel?: string;
}

/** Figma 64:188 — full-bleed 700px cover band.
 *
 * Renders nothing when a post has no cover image. It used to fall back to a
 * 700px box captioned "Article hero image — full bleed", which every post hit,
 * so every article opened on a large panel announcing its own missing asset. */
export const ArticleImageSection: React.FC<ArticleImageProps> = ({ post }) => {
  if (!post.coverImageUrl) return null;

  return (
    <section className={styles.imageSection} aria-hidden="true">
      <Image
        src={post.coverImageUrl}
        alt=""
        fill
        sizes="100vw"
        className={styles.imageAsset}
        priority
      />
    </section>
  );
};

export interface ArticleBodyProps {
  post: BlogPostItem;
}

export const ArticleBodySection: React.FC<ArticleBodyProps> = ({ post }) => {
  if (post.body.length === 0) return null;

  return (
    <SectionWrapper theme="canvas" padding="custom" id="article-body" className={styles.bodySection}>
      <PageContainer>
        <article className={styles.prose}>
          {post.body.map((block, i) => {
            const key = `${block.type}-${i}`;
            switch (block.type) {
              case 'lead':
                return <p key={key} className={styles.lead}>{block.text}</p>;
              case 'heading':
                return <h2 key={key} className={styles.h2}>{block.text}</h2>;
              case 'quote':
                return <blockquote key={key} className={styles.quote}>{block.text}</blockquote>;
              case 'list':
                return (
                  <ul key={key} className={styles.list}>
                    {block.items.map((item) => (
                      <li key={item} className={styles.listItem}>
                        <span className={styles.bullet} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              case 'figure':
                /* Figma 64:214 — inline diagram band with a caption. No asset
                   is exported, so the gradient placeholder stands in. */
                return (
                  <figure key={key} className={styles.figure}>
                    <div className={styles.figureBand}>
                      <span className={styles.figurePlaceholder}>{block.placeholder}</span>
                    </div>
                    <figcaption className={styles.figureCaption}>{block.caption}</figcaption>
                  </figure>
                );
              default:
                return <p key={key} className={styles.paragraph}>{block.text}</p>;
            }
          })}
        </article>
      </PageContainer>
    </SectionWrapper>
  );
};

export interface AuthorBioProps {
  post: BlogPostItem;
}

export const AuthorBioSection: React.FC<AuthorBioProps> = ({ post }) => {
  if (!post.authorBio) return null;

  return (
    <SectionWrapper theme="canvas" padding="custom" id="author-bio" className={styles.authorSection}>
      <PageContainer>
        <div className={styles.authorCard}>
          <span className={styles.authorAvatar} aria-hidden="true" />
          <div className={styles.authorText}>
            <p className={styles.authorCardName}>{post.authorName}</p>
            <p className={styles.authorCardBio}>{post.authorBio}</p>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};

export interface RelatedPostsProps {
  posts: BlogPostItem[];
  label: string;
}

export const RelatedPostsSection: React.FC<RelatedPostsProps> = ({ posts, label }) => {
  if (posts.length === 0) return null;

  return (
    <SectionWrapper theme="canvas" padding="custom" id="related-posts" className={styles.relatedSection}>
      <SectionDots />

      <PageContainer>
        <div className={styles.relatedEyebrow}>
          <Eyebrow align="left" tone="muted">{label}</Eyebrow>
        </div>

        <ul className={styles.relatedGrid}>
          {posts.map((p) => (
            <li key={p.id} className={styles.relatedItem}>
              <article className={styles.relatedCard}>
                <p className={styles.relatedMeta}>
                  <span className={styles.relatedCategory}>{p.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.readTimeMinutes} min</span>
                </p>
                <h2 className={styles.relatedTitle}>
                  <Link href={`/blog/${p.slug}`} className={styles.relatedLink}>{p.title}</Link>
                </h2>
                <p className={styles.relatedExcerpt}>{p.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </SectionWrapper>
  );
};
