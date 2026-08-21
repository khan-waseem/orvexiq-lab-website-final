'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { TestimonialData } from '@/content/schemas/testimonial.schema';
import styles from './ClientStoriesSection.module.css';

export interface ClientStoriesSectionProps {
  content: HomepageContent['clientStoriesSection'];
  testimonials: TestimonialData[];
}

const Chevron: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M10 3.5 5.5 8l4.5 4.5' : 'M6 3.5 10.5 8 6 12.5'}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ClientStoriesSection — landing band seven.
 *
 * A quote carousel: one story at a time, with the orbit visual on the right.
 * Renders nothing when there is no publishable testimonial, so an unverified
 * quote can never reach the page — the page filters, and this gates again.
 */
export const ClientStoriesSection: React.FC<ClientStoriesSectionProps> = ({
  content,
  testimonials,
}) => {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const total = testimonials.length;
  const story = testimonials[index];
  const hasMultiple = total > 1;

  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <SectionWrapper
      padding="custom"
      className={styles.section}
      ariaLabelledBy="client-stories-heading"
    >
      <GlowRings side="left" size={1000} />
      <GlowRings side="right" size={880} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="client-stories-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          sub={content.subdescription}
        >
          {content.headlineLine1}
          <br />
          {content.headlineLine2}
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <div className={styles.carousel}>
          {hasMultiple && (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => step(-1)}
              aria-label="Previous client story"
            >
              <Chevron direction="left" />
            </button>
          )}

          <figure className={styles.card}>
            <div className={styles.quoteColumn}>
              <span className={styles.quoteMark} aria-hidden="true">
                &ldquo;
              </span>

              <div className={styles.quoteBody}>
                <blockquote className={styles.quote} aria-live="polite">
                  {story.quote}
                </blockquote>

                <span className={`${styles.quoteMark} ${styles.quoteMarkClose}`} aria-hidden="true">
                  &rdquo;
                </span>
              </div>
            </div>

            {/* Portrait carries the attribution beneath it, so the quote column
                stays a single block of text. */}
            <figcaption className={styles.person}>
              <span className={styles.portrait}>
                {story.avatarAssetUrl ? (
                  <Image
                    src={story.avatarAssetUrl}
                    alt={story.authorName}
                    width={420}
                    height={520}
                    className={styles.portraitImage}
                  />
                ) : null}
              </span>

              <span className={styles.personName}>{story.authorName}</span>
              <span className={styles.personRole}>{story.authorRole}</span>
              <span className={styles.personCompany}>{story.clientCompanyProfile}</span>
            </figcaption>
          </figure>

          {hasMultiple && (
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => step(1)}
              aria-label="Next client story"
            >
              <Chevron direction="right" />
            </button>
          )}
        </div>

        {hasMultiple && (
          <div className={styles.dotsRow}>
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.pageDot} ${i === index ? styles.pageDotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show client story ${i + 1} of ${total}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </SectionWrapper>
  );
};
