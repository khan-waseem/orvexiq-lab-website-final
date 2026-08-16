import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { TestimonialData } from '@/content/schemas/testimonial.schema';
import styles from './TestimonialSection.module.css';

export interface TestimonialSectionProps {
  testimonials: TestimonialData[];
}

/**
 * TestimonialSection Component (1:1 Figma Match — Node 218:600)
 *
 * Requirements:
 * - Decoupled content repository consumption (TestimonialData[])
 * - Exact 1:1 Figma quote card styling (96px padding, 24px radius, 18px blur, 32px quote font, 48px line height)
 * - Opening & closing quote marks in brand accent (#9b6fe6)
 * - Reuses SectionWrapper, PageContainer primitives
 * - 100% token governance
 */
export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const activeTestimonial = testimonials.find((t) => t.published) || testimonials[0];

  if (!activeTestimonial) {
    return null;
  }

  return (
    <SectionWrapper theme="canvas" padding="lg" id="testimonials">
      {/* Background Radial Purple Glow */}
      <div className={styles.testimonialGlow} aria-hidden="true">
        <Image
          src="/assets/testimonials/testimonial-glow.svg"
          alt=""
          width={860}
          height={860}
          className={styles.glowImage}
        />
      </div>

      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Testimonial Glass Card (Node 218:602) */}
          <article className={styles.quoteCard} aria-label="Client testimonial">
            {/* Opening Quote Mark (Node 218:603) */}
            <div className={styles.openingQuoteMark} aria-hidden="true">
              “
            </div>

            <div className={styles.innerContent}>
              {/* Quote Text (Node 218:605) */}
              <blockquote className={styles.quoteText}>
                {activeTestimonial.quote}
              </blockquote>

              {/* Author Details (Node 218:606) */}
              <div className={styles.authorRow}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={activeTestimonial.avatarAssetUrl}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.avatarImage}
                  />
                </div>

                <div className={styles.authorMeta}>
                  <p className={styles.authorName}>{activeTestimonial.authorName}</p>
                  <p className={styles.authorRole}>{activeTestimonial.clientCompanyProfile}</p>
                </div>
              </div>
            </div>

            {/* Closing Quote Mark (Node 218:611) */}
            <div className={styles.closingQuoteMark} aria-hidden="true">
              “
            </div>
          </article>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
