import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { CaseStudiesPageHeroContent } from '@/content/schemas/case-studies-page.schema';
import styles from './CaseStudiesHeroSection.module.css';

export interface CaseStudiesHeroSectionProps {
  content: CaseStudiesPageHeroContent;
}

/**
 * CaseStudiesHeroSection — Figma node 183:795 (Page / Case Studies / Page Hero)
 *
 * 1440 reference (section height 568):
 *   headline y=225  888x80  — 72px/80px Bold, tracking -2.16  (183:805)
 *   sub      y=327  760x64  — 20px/32px Regular, secondary    (183:806)
 *   icon     x=862.5 y=52.5 465x464                            (183:854)
 *
 * `heroIconAssetUrl` is optional: Figma ships this hero without an exported
 * icon asset, so the visual is omitted rather than substituted.
 */
export const CaseStudiesHeroSection: React.FC<CaseStudiesHeroSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="case-hero" className={styles.heroSection}>
      <div className={styles.heroGlow} aria-hidden="true" />

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
            <h1 className={styles.headline}>{content.headline}</h1>
            <p className={styles.subdescription}>{content.subdescription}</p>
          </div>

          {content.heroIconAssetUrl ? (
            <div className={styles.visualColumn}>
              <Image
                src={content.heroIconAssetUrl}
                alt=""
                width={465}
                height={464}
                className={styles.heroIconImage}
                priority
              />
            </div>
          ) : null}
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
