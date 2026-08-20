import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './LandingCtaSection.module.css';

export interface LandingCtaSectionProps {
  content: HomepageContent['landingCtaSection'];
  /** Address behind the secondary action. */
  email?: string;
}

/** Four-point spark sitting inside the eyebrow capsule. */
const Spark: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 0.8 7.2 4.8 11.2 6 7.2 7.2 6 11.2 4.8 7.2 0.8 6 4.8 4.8 6 0.8Z"
          fill="currentColor" />
  </svg>
);

/**
 * LandingCtaSection — landing band eight.
 *
 * One large panel with light raking in from the bottom corners. The shared
 * CtaSection stays in place for the other pages; this is the landing's own
 * oversized treatment.
 */
export const LandingCtaSection: React.FC<LandingCtaSectionProps> = ({
  content,
  email = 'hello@orvexiq.com',
}) => (
  <SectionWrapper
    padding="custom"
    className={styles.section}
    ariaLabelledBy="landing-cta-heading"
  >
    <PageContainer>
      <div className={styles.panel}>
        {/* Light streaks raking in from the lower corners. */}
        <span className={`${styles.streak} ${styles.streakLeft}`} aria-hidden="true" />
        <span className={`${styles.streak} ${styles.streakRight}`} aria-hidden="true" />
        <span className={styles.floorGlow} aria-hidden="true" />

        <div className={styles.panelInner}>
          <SectionHeading
            id="landing-cta-heading"
            eyebrow={content.eyebrow}
            eyebrowIcon={<Spark />}
            size="lg"
            sub={content.subdescription}
          >
            {content.headlineLine1}
            <br />
            {content.headlineLine2}
            <br />
            <Accent>{content.headlineAccent3}</Accent>
          </SectionHeading>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              {content.primaryCtaText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <a href={`mailto:${email}`} className={styles.secondary}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="14" height="10" rx="1.8" stroke="currentColor"
                      strokeWidth="1.3" />
                <path d="m2.6 5 6.4 4.6L15.4 5" stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {content.emailCtaText}
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionWrapper>
);
