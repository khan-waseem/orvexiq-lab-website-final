import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './LandingCtaSection.module.css';

export type LandingCtaContent = HomepageContent['landingCtaSection'];

/** Shape the other pages still carry from the previous CTA band. */
export interface LegacyCtaContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subdescriptionLine1: string;
  subdescriptionLine2: string;
  primaryCtaText: string;
  emailCtaText: string;
}

export interface LandingCtaSectionProps {
  content: LandingCtaContent | LegacyCtaContent;
  /** Address behind the secondary action. */
  email?: string;
}

/**
 * Folds the older two-line CTA copy into this band's shape: the second
 * headline line becomes the accented run, and the two sub lines join into
 * one paragraph. Keeps every page on one CTA component without having to
 * rewrite each page's content file.
 */
const normalize = (content: LandingCtaContent | LegacyCtaContent): LandingCtaContent =>
  'headlineAccent2' in content
    ? content
    : {
        eyebrow: content.eyebrow,
        headlineLine1: content.headlineLine1,
        headlineAccent2: content.headlineLine2,
        subdescription: `${content.subdescriptionLine1} ${content.subdescriptionLine2}`.trim(),
        primaryCtaText: content.primaryCtaText,
        emailCtaText: content.emailCtaText,
      };

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
 * One large panel with light raking in from the bottom corners. Every page
 * uses this band — the older CtaSection it replaced is gone, so the closing
 * call to action looks the same wherever a visitor reaches it.
 */
export const LandingCtaSection: React.FC<LandingCtaSectionProps> = ({
  content: rawContent,
  email = 'info@orvexiqlabs.com',
}) => {
  const content = normalize(rawContent);

  return (
  <SectionWrapper
    padding="custom"
    className={styles.section}
    ariaLabelledBy="landing-cta-heading"
  >
    <div className={styles.panel}>
      {/* Light streaks raking in from the lower corners. */}
      <span className={`${styles.streak} ${styles.streakLeft}`} aria-hidden="true" />
      <span className={`${styles.streak} ${styles.streakRight}`} aria-hidden="true" />
      <span className={styles.floorGlow} aria-hidden="true" />

      <PageContainer className={styles.panelInner}>
        <SectionHeading
          id="landing-cta-heading"
          eyebrow={content.eyebrow}
          eyebrowIcon={<Spark />}
          rule="dot"
          size="lg"
          sub={content.subdescription}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
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
      </PageContainer>
    </div>
  </SectionWrapper>
  );
};
