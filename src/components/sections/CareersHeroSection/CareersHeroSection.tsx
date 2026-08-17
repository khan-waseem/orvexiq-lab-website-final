import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { CareersHeroContent } from '@/content/schemas/careers-page.schema';
import styles from './CareersHeroSection.module.css';

export interface CareersHeroSectionProps {
  content: CareersHeroContent;
}

/**
 * CareersHeroSection — Figma node 183:643 (Page / Careers / Section / Page Hero)
 *
 * 1440 reference (section height 568):
 *   nav      y=37  (1250x83, supplied globally by Navbar)
 *   headline y=193 797x160  — 72px/80px Bold, tracking -2.16  (183:653)
 *   sub      y=377 760x64   — 20px/32px Regular, secondary     (183:654)
 *   icon     x=893 y=98.5   443x443                            (183:748)
 *   glow     ellipse 650.78 centred on (688.6, 33.7)           (183:382)
 *
 * Unlike the homepage hero there is no eyebrow, and the headline is the larger
 * 72px page-title size rather than 48px.
 */
export const CareersHeroSection: React.FC<CareersHeroSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="careers-hero" className={styles.heroSection}>
      {/* Ambient glow — CSS gradient for the same reason as the homepage hero:
          the exported asset bakes a 450px blur that rasterises inconsistently. */}
      <div className={styles.heroGlow} aria-hidden="true" />

      {/* Background grid vector (Figma 183:384 — clip box holding a taller vector) */}
      <div className={styles.vectorOverlay} aria-hidden="true">
        <Image
          src="/assets/hero-vector.svg"
          alt=""
          width={1440}
          height={798}
          className={styles.gridImage}
          priority
        />
      </div>

      <PageContainer className={styles.contentContainer}>
        <div className={styles.heroLayout}>
          <div className={styles.contentColumn}>
            {/* explicit space: the break is hidden at <=600px so the copy can
                reflow, and without it the lines would concatenate */}
            <h1 className={styles.headline}>
              {content.headlineLine1}{' '}
              <br />
              {content.headlineLine2}
            </h1>

            <p className={styles.subdescription}>{content.subdescription}</p>
          </div>

          <div className={styles.visualColumn}>
            <Image
              src={content.heroIconAssetUrl}
              alt=""
              width={441}
              height={441}
              className={styles.heroIconImage}
              priority
            />
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
