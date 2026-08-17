import React from 'react';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Button } from '@/components/primitives/Button';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './CtaSection.module.css';

/** `band` = homepage (86:979, full-bleed). `boxed` = Services (31:78, inset card). */
export type CtaVariant = 'band' | 'boxed';

export interface CtaSectionProps {
  content: HomepageContent['ctaSection'];
  variant?: CtaVariant;
}

/**
 * CtaSection Component — Figma node 86:978 (Landing / Section / CTA)
 *
 * Figma geometry at 1440 (section height 818):
 *   128 canvas -> full-bleed gradient card (562) -> 128 canvas
 *   card padding 96, children stacked centred with a 24 gap
 *   eyebrow(16) headline(128) sub(60) spacer(16) actions(54)
 *
 * The card is intentionally full-bleed: in Figma it is 1440 wide at x=0,
 * i.e. it ignores the 96px page margin that its own copy respects.
 */
export const CtaSection: React.FC<CtaSectionProps> = ({ content, variant = 'band' }) => {
  const emailHref = `mailto:${content.emailCtaText}`;
  const isBoxed = variant === 'boxed';

  return (
    <section
      className={`${styles.ctaSection} ${isBoxed ? styles.boxedSection : ''}`}
      aria-labelledby="cta-heading"
    >
      <div className={`${styles.ctaCard} ${isBoxed ? styles.boxedCard : ''}`}>
        <div className={styles.ctaInner}>
          {/* Figma 86:980 flanks the label with two dashes; the boxed variant
              (31:79) uses a single leading dash. */}
          <Eyebrow align={isBoxed ? 'left' : 'center'} tone="muted">
            {content.eyebrow}
          </Eyebrow>

          {/*
            The explicit space before each <br /> matters: the break is hidden
            at <=600px so the copy can reflow to the phone measure, and without
            it the two lines would concatenate ("complexto build?").
          */}
          <Heading level="h2" align="center" id="cta-heading" className={styles.ctaHeadline}>
            {content.headlineLine1}{' '}
            <br />
            {content.headlineLine2}
          </Heading>

          <Text as="p" size="lg" color="secondary" weight="regular" className={styles.ctaSub}>
            {content.subdescriptionLine1}{' '}
            <br />
            {content.subdescriptionLine2}
          </Text>

          <div className={styles.spacer} aria-hidden="true" />

          <div className={styles.actions}>
            <Button variant="ctaPrimary" href="/contact">
              {content.primaryCtaText}
            </Button>
            <Button variant="email" href={emailHref}>
              {content.emailCtaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
