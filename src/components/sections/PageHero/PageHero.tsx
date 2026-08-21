import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import styles from './PageHero.module.css';

export interface PageHeroAction {
  label: string;
  href: string;
}

export interface PageHeroProps {
  /** Sentence-case line above the headline — plain text, as on the landing. */
  eyebrow: string;
  headline: string;
  subdescription: string;
  /** The page's 3D mark, shown to the right of the copy. */
  iconAssetUrl?: string;
  primaryCta?: PageHeroAction;
  secondaryCta?: PageHeroAction;
  id?: string;
}

/**
 * PageHero — the shared opening band for every page below the landing.
 *
 * Deliberately built to the landing hero's pattern rather than to the landing
 * *section* pattern: plain eyebrow, sans headline, supporting line, optional
 * actions, mark on the right, over the same ambient glow and grid. The serif
 * headline with its capsule and dot rule belongs to the section bands further
 * down each page, so the two never compete at the top of a page.
 *
 * Replaces the seven near-identical per-page hero components, so a change to
 * the hero language lands everywhere at once.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  headline,
  subdescription,
  iconAssetUrl,
  primaryCta,
  secondaryCta,
  id,
}) => (
  <SectionWrapper id={id} padding="custom" className={styles.hero} aria-label="Page hero">
    {/* Ambient glow — a CSS gradient rather than the exported asset, whose
        450px blur rasterises inconsistently once scaled past 1440. */}
    <div className={styles.glow} aria-hidden="true" />

    <div className={styles.gridOverlay} aria-hidden="true">
      <Image
        src="/assets/hero-vector.svg"
        alt=""
        width={1440}
        height={798}
        className={styles.gridImage}
        priority
      />
    </div>

    <PageContainer className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <Text as="p" size="xl" color="primary" weight="light" className={styles.eyebrow}>
            {eyebrow}
          </Text>

          <Heading level="h1" align="left" className={styles.headline}>
            {headline}
          </Heading>

          <Text as="p" size="xl" color="primary" weight="regular" className={styles.sub}>
            {subdescription}
          </Text>

          {(primaryCta || secondaryCta) && (
            <div className={styles.actions}>
              {primaryCta && (
                <Button variant="primary" href={primaryCta.href}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="secondary" href={secondaryCta.href}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {iconAssetUrl && (
          <div className={styles.visual}>
            <span className={styles.visualGlow} aria-hidden="true" />
            <Image
              src={iconAssetUrl}
              alt=""
              width={492}
              height={492}
              className={styles.icon}
              priority
            />
          </div>
        )}
      </div>
    </PageContainer>
  </SectionWrapper>
);
