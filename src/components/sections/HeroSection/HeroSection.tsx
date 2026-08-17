import React from 'react';
import Image from 'next/image';
import { PageContainer } from '@/components/layout/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  content: HomepageContent['hero'];
}

/**
 * HeroSection Component — Figma node 183:4 (Landing / Section / Hero)
 *
 * Figma geometry at 1440 (section height 789):
 *   eyebrow  y=237  20px / 28px Light, text-primary  (183:10)
 *   h1       y=281  48px / 64px SemiBold, w=676      (183:11)
 *   sub      y=498  20px / 28px Regular, w=597       (183:12)
 *   buttons  y=591  h=48, 18px / 28px Medium         (183:13, 183:16)
 *   visual   x=741 y=161 613x548                     (183:42)
 *
 * Note: the hero eyebrow in Figma is plain sentence-case text, NOT the
 * dashed uppercase Eyebrow primitive used by the other sections.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section className={styles.heroSection} aria-label="Hero Section">
      {/* Ambient Glow — CSS gradient, see HeroSection.module.css for why */}
      <div className={styles.heroGlow} aria-hidden="true" />

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

      <PageContainer className={styles.heroContainer}>
        <div className={styles.heroLayout}>
          {/* Left Column: Text & Actions */}
          <div className={styles.contentColumn}>
            <Text
              as="p"
              size="xl"
              color="primary"
              weight="light"
              className={styles.eyebrowText}
            >
              {content.eyebrow}
            </Text>

            <Heading level="h1" align="left" className={styles.headline}>
              {content.headline}
            </Heading>

            <Text as="p" size="xl" color="primary" weight="regular" className={styles.subdescription}>
              {content.subdescription}
            </Text>

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
      </PageContainer>
    </section>
  );
};
