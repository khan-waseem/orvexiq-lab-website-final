import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { NotFoundPageContent } from '@/content/schemas/not-found-page.schema';
import styles from './NotFoundSection.module.css';

export interface NotFoundSectionProps {
  content: NotFoundPageContent;
}

/**
 * NotFoundSection — Figma node 54:16 (Page / 404 / Section / 404 Body)
 *
 * 1440 reference (section height 1031):
 *   code   y=128  180px Bold, tracking -9              (54:21)
 *   block  y=398  headline 48/58, sub 19/31, actions   (183:892)
 *   links  y=660  label + 4 cards, 24px gutters        (54:29)
 *   icon   x=992 y=155 352x352                          (114:9)
 */
export const NotFoundSection: React.FC<NotFoundSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="not-found" className={styles.section}>
      {/* Same ambient glow + grid treatment as the page heroes */}
      <div className={styles.heroGlow} aria-hidden="true" />

      <GlowRings side="left" size={1000} />
      <GlowRings side="right" size={880} />
      <SectionDots />

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

      <PageContainer className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.code} aria-hidden="true">
              {content.code}
            </p>

            <h1 className={styles.headline}>{content.headline}</h1>
            <p className={styles.sub}>{content.subdescription}</p>

            <div className={styles.actions}>
              <Link href={content.primaryCta.href} className={styles.primaryCta}>
                {content.primaryCta.label}
              </Link>
              <Link href={content.secondaryCta.href} className={styles.secondaryCta}>
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <Image
              src={content.heroIconAssetUrl}
              alt=""
              width={352}
              height={352}
              className={styles.visualImage}
              priority
            />
          </div>
        </div>

        <div className={styles.links}>
          <p className={styles.linksLabel}>{content.linksLabel}</p>
          <ul className={styles.linkRow}>
            {content.links.map((l) => (
              <li key={l.id} className={styles.linkItem}>
                <Link href={l.href} className={styles.linkCard}>
                  <span className={styles.linkTitle}>{l.title}</span>
                  <span className={styles.linkBody}>{l.body}</span>
                  <span className={styles.linkArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
