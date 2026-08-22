import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { BlogPageContent } from '@/content/schemas/blog-page.schema';
import styles from './NewsletterSection.module.css';

export interface NewsletterSectionProps {
  content: BlogPageContent['newsletter'];
}

/**
 * NewsletterSection — Figma node 64:103 (Page / Blog / Section / Newsletter)
 *
 * 1440 reference (section height 497, padding 64 top / 96 bottom):
 *   card 1248x337: padding 64, gap 24, r24
 *   headline 36/44 Bold -0.72 | sub 17/28 (620 wide) | form 56px tall
 *
 * There is no subscribe endpoint yet, so the form is deliberately inert: the
 * fields are present and labelled, but nothing is submitted or collected.
 */
export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="newsletter" className={styles.section}>
      <GlowRings side="left" size={860} />
      <GlowRings side="right" size={760} />
      <SectionDots />
      <PageContainer>
        <div className={styles.card}>
          <SectionHeading
            eyebrow={content.eyebrow}
            rule="dot"
            align="left"
            className={styles.heading}
            sub={content.subdescription}
          >
            {content.headlineLine1} <Accent>{content.headlineAccent2}</Accent>
          </SectionHeading>

          <div className={styles.form}>
            <label className={styles.srOnly} htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={styles.input}
              placeholder={content.inputPlaceholder}
              disabled
            />
            <button type="button" className={styles.submit} disabled>
              {content.submitLabel}
            </button>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
