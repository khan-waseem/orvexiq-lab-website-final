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
 * TestimonialSection Component — Figma node 86:967
 *
 * Requirements:
 * - Decoupled content repository consumption (TestimonialData[])
 * - Figma quote card styling (96px padding, 24px radius, 18px blur, 32px/48px quote)
 * - Opening & closing quote marks in brand accent
 * - Reuses SectionWrapper, PageContainer primitives
 *
 * PUBLICATION GATE
 * The Figma frame is named "[PLACEHOLDER QUOTE]" and the only testimonial in the
 * content repository carries `verification.isVerified: false`. A quote attributed
 * to a named role at a named client is a factual claim, so this section renders
 * nothing until a testimonial is BOTH published AND verified.
 *
 * This is a content gate, not a teardown: the component, its styles and the
 * schema are unchanged, so flipping `isVerified` to true on a real, attributable
 * testimonial in `src/content/data/testimonials.json` restores the section in
 * its Figma-matched form with no code change.
 */
export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const activeTestimonial = testimonials.find(
    (t) => t.published && t.verification?.isVerified === true
  );

  if (!activeTestimonial) {
    return null;
  }

  return (
    <SectionWrapper theme="canvas" padding="lg" id="testimonials" className={styles.testimonialSection}>
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
