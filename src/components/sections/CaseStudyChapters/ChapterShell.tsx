import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import styles from './Chapters.module.css';

export interface ChapterShellProps {
  id: string;
  number: string;
  label: string;
  headlineLine1: string;
  headlineAccent2: string;
  /** Supporting copy. `split` puts it beside the headline instead of under. */
  intro?: string;
  layout?: 'stacked' | 'split';
  children: React.ReactNode;
}

/**
 * ChapterShell — the frame every case study chapter shares.
 *
 * Carries the chapter counter, the serif headline with its one gradient
 * accent, and the background treatment: arcs, corner dots and a faint scan
 * grid that fades out down the screen. Chapters supply only their own diagram.
 */
export const ChapterShell: React.FC<ChapterShellProps> = ({
  id,
  number,
  label,
  headlineLine1,
  headlineAccent2,
  intro,
  layout = 'stacked',
  children,
}) => {
  const headingId = `${id}-heading`;
  const split = layout === 'split' && Boolean(intro);

  const heading = (
    <>
      <p className={styles.chapterLabel}>
        <span className={styles.chapterNumber}>{number}</span>
        <span className={styles.chapterDot} aria-hidden="true" />
        <span className={styles.chapterName}>{label}</span>
      </p>

      <h2 id={headingId} className={styles.headline}>
        {headlineLine1}
        <span className={styles.accent}>{headlineAccent2}</span>
      </h2>
    </>
  );

  return (
    <SectionWrapper
      id={id}
      padding="custom"
      className={styles.chapter}
      ariaLabelledBy={headingId}
    >
      <GlowRings side="left" size={1000} />
      <GlowRings side="right" size={880} />
      <SectionDots />

      <PageContainer className={styles.container}>
        {split ? (
          <div className={styles.splitHead}>
            <div>{heading}</div>
            <p className={styles.intro}>{intro}</p>
          </div>
        ) : (
          <>
            {heading}
            {intro && <p className={styles.intro}>{intro}</p>}
          </>
        )}

        {children}
      </PageContainer>
    </SectionWrapper>
  );
};
