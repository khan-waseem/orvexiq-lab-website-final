import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import Image from 'next/image';
import { IntroChapter as IntroChapterContent } from '@/content/schemas/case-study-chapter.schema';
import { ScreenShot } from './ScreenShot';
import styles from './Chapters.module.css';
import intro from './IntroChapter.module.css';

export interface IntroChapterProps {
  chapter: IntroChapterContent;
  origin: string;
}

const META_ICONS = {
  role: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="6.6" r="3.2" />
      <path d="M3.8 17c0-3.2 2.8-5.2 6.2-5.2s6.2 2 6.2 5.2" />
    </svg>
  ),
  duration: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4.4" width="14" height="12.6" rx="2.4" />
      <path d="M3 8.4h14M7 2.8v3M13 2.8v3" />
    </svg>
  ),
  industry: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7.2" />
      <circle cx="10" cy="10" r="2.8" />
    </svg>
  ),
} as const;

const ORIGIN_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2.6l1.9 4.6 4.6 1.9-4.6 1.9L10 15.6l-1.9-4.6L3.5 9.1l4.6-1.9z" />
  </svg>
);

/**
 * IntroChapter — the case study's opening screen.
 *
 * Copy on the left, the product itself on the right, the same way the landing
 * hero is built: a visitor sees what was made before reading a word about it.
 *
 * Whether this was client work or a concept is stated as one of the meta facts
 * rather than as a banner across the top. It still has to be said — a concept
 * presented as delivered work is a false claim — but it belongs beside role and
 * industry, not above the title.
 */
export const IntroChapter: React.FC<IntroChapterProps> = ({ chapter, origin }) => {
  /* "Self-initiated concept · Clinical trial operations" — the trailing half
     repeats the industry fact, so only the origin itself is kept. */
  const originValue = origin.split('·')[0].trim();

  return (
    <SectionWrapper
      id={chapter.id}
      padding="custom"
      className={`${styles.chapter} ${intro.section}`}
      ariaLabelledBy={`${chapter.id}-heading`}
    >
      {/* Same treatment as the landing hero: the case study opens on the page
          the visitor just came from, so the top of it should feel continuous. */}
      <div className={intro.glow} aria-hidden="true" />

      <div className={intro.gridOverlay} aria-hidden="true">
        <Image
          src="/assets/hero-vector.svg"
          alt=""
          width={1440}
          height={798}
          className={intro.gridImage}
          priority
        />
      </div>

      <PageContainer className={styles.container}>
        <div className={intro.layout}>
          <div className={intro.copy}>
            <p className={styles.chapterLabel}>
              <span className={styles.chapterNumber}>{chapter.number}</span>
              <span className={styles.chapterDot} aria-hidden="true" />
              <span className={styles.chapterName}>{chapter.label}</span>
            </p>

            <h1 id={`${chapter.id}-heading`} className={intro.title}>
              {chapter.title}
            </h1>

            <p className={intro.headline}>
              {chapter.headlineLine1}{' '}
              <span className={styles.accent}>{chapter.headlineAccent2}</span>
            </p>

            <p className={intro.description}>{chapter.description}</p>

            <span className={intro.rule} aria-hidden="true" />

            <dl className={intro.meta}>
              {chapter.meta.map((item) => (
                <div key={item.id} className={intro.metaItem}>
                  <span className={intro.metaIcon}>{META_ICONS[item.icon]}</span>
                  <div className={intro.metaText}>
                    <dt className={intro.metaLabel}>{item.label}</dt>
                    <dd className={intro.metaValue}>{item.value}</dd>
                    {item.note && <dd className={intro.metaNote}>{item.note}</dd>}
                  </div>
                </div>
              ))}

              <div className={intro.metaItem}>
                <span className={intro.metaIcon}>{ORIGIN_ICON}</span>
                <div className={intro.metaText}>
                  <dt className={intro.metaLabel}>Origin</dt>
                  <dd className={intro.metaValue}>{originValue}</dd>
                </div>
              </div>
            </dl>
          </div>

          {chapter.screen && (
            <div className={intro.visual}>
              <ScreenShot
                screen={chapter.screen}
                className={intro.visualScreen}
                sizes="(max-width: 1024px) 100vw, 660px"
                priority
              />
            </div>
          )}
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
