import React from 'react';
import Image from 'next/image';
import { PageContainer } from '@/components/layout/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Button } from '@/components/primitives/Button';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  content: HomepageContent['hero'];
}

/**
 * HeroSection Component (1:1 Figma Match — Node 218:262)
 *
 * Requirements:
 * - Single `<h1>` on the homepage
 * - Reuses existing primitives (Heading, Text, Eyebrow, Button, PageContainer)
 * - 100% token adherence (zero hardcoded visual values in module.css)
 * - Content passed from content repository contract
 * - Direct primary CTA -> `/contact`, secondary CTA -> `/case-studies`
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section className={styles.heroSection} aria-label="Hero Section">
      {/* Ambient Glow Graphic */}
      <div className={styles.heroGlow} aria-hidden="true">
        <Image
          src="/assets/hero-glow.svg"
          alt=""
          width={650}
          height={650}
          className={styles.glowImage}
          priority
        />
      </div>

      {/* Background Grid Vector Overlay */}
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

      <PageContainer>
        <div className={styles.heroLayout}>
          {/* Left Column: Text & Actions */}
          <div className={styles.contentColumn}>
            {/* Subhead Eyebrow */}
            <div className={styles.eyebrowMargin}>
              <Eyebrow align="left">{content.eyebrow}</Eyebrow>
            </div>

            {/* Main H1 Title */}
            <div className={styles.headingMargin}>
              <Heading level="h1" align="left">
                {content.headline}
              </Heading>
            </div>

            {/* Supporting Paragraph */}
            <div className={styles.descriptionMargin}>
              <Text size="xl" color="secondary" weight="regular">
                {content.subdescription}
              </Text>
            </div>

            {/* Action Buttons Group */}
            <div className={styles.actionsGroup}>
              <Button variant="primary" href="/contact">
                {content.primaryCtaText}
              </Button>
              <Button variant="secondary" href="/case-studies">
                {content.secondaryCtaText}
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Hero Visual Asset */}
          <div className={styles.visualColumn}>
            <div className={styles.heroIconWrapper}>
              <Image
                src="/assets/hero-icon.png"
                alt="Orvexiq Lab 3D Modular Product Icon"
                width={613}
                height={548}
                className={styles.heroIconImage}
                priority
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
