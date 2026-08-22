import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { CaseStudy } from '@/content/schemas/case-study.schema';
import { CaseMockup } from './CaseMockup';
import { HoverVideo } from '@/components/primitives/HoverVideo';
import { CATEGORY_ICONS } from './CategoryIcons';
import styles from './SelectedWorkSection.module.css';

export interface SelectedWorkSectionProps {
  /** Slugs that have a written detail page. Cards outside this list render
      without a link rather than pointing at a 404. */
  readableSlugs?: string[];
  content: HomepageContent['selectedWorkSection'];
  caseStudies: CaseStudy[];
  /** How many cards to show. The landing runs the full 2x2; other pages use
   *  this band as a shorter proof strip. */
  limit?: number;
}

/** Cards are a fixed 2x2 grid in the design; extra featured work is ignored. */
const CARD_LIMIT = 4;

/**
 * SelectedWorkSection — landing band three.
 *
 * Two-by-two grid of case cards. The screen art inside each card is the
 * shared `CaseMockup`, built in markup; a case study overrides it by setting
 * `coverScreenAssetUrl`, so real project artwork can be dropped in per case
 * without touching this component.
 */
export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  readableSlugs = [],
  content,
  caseStudies,
  limit = CARD_LIMIT,
}) => {
  const cards = caseStudies.slice(0, limit);

  return (
    <SectionWrapper
      id="work"
      padding="custom"
      className={styles.section}
      ariaLabelledBy="selected-work-heading"
    >
      <GlowRings side="left" size={1100} />
      <GlowRings side="right" size={1000} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="selected-work-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          sub={content.subdescription}
        >
          {content.headlineLine1}
          <br />
          {content.headlineLine2}
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <ul className={styles.grid}>
          {cards.map((study, index) => {
            const CategoryIcon = CATEGORY_ICONS[study.category] ?? CATEGORY_ICONS.GENERAL;
            const href = `/case-studies/${study.slug}`;
            const readable = readableSlugs.includes(study.slug);

            return (
              <li key={study.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.categoryIcon}>
                    <CategoryIcon />
                  </span>
                  <span className={styles.category}>{study.category}</span>
                </div>

                <h3 className={styles.cardTitle}>
                  {readable ? (
                    <Link href={href} className={styles.cardTitleLink}>
                      {study.title}
                    </Link>
                  ) : (
                    study.title
                  )}
                </h3>

                <p className={styles.cardBody}>{study.description}</p>

                {/* A real recording of the product where there is one, the
                    drawn mockup where there is not. The recording rests on its
                    first frame and runs while the pointer is over the card. */}
                <div className={styles.mockupWell}>
                  {study.coverScreenAssetUrl ? (
                    <Image
                      src={study.coverScreenAssetUrl}
                      alt={`${study.title} interface`}
                      width={602}
                      height={300}
                      className={styles.coverImage}
                    />
                  ) : study.mockupVideoUrl && study.mockupPosterUrl ? (
                    <HoverVideo
                      src={study.mockupVideoUrl}
                      poster={study.mockupPosterUrl}
                      label={`${study.title} interface`}
                      className={styles.mockupVideo}
                    />
                  ) : (
                    <CaseMockup label={study.title} />
                  )}
                </div>

                <ul className={styles.tags}>
                  {study.servicesProvided.map((service) => (
                    <li key={service} className={styles.tag}>
                      <span className={styles.tagDot} aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFoot}>
                  {readable ? (
                    <>
                      <Link href={href} className={styles.cardCta} tabIndex={-1} aria-hidden="true">
                        {content.cardCtaText}
                        <span className={styles.cardCtaIcon}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6h7M6.4 3.2 9.2 6l-2.8 2.8" stroke="currentColor" strokeWidth="1.2"
                                  strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>

                      <span className={styles.cornerButton} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <span className={styles.pending}>{content.comingSoonLabel ?? 'Write-up in progress'}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.viewAllRow}>
          <Link href="/case-studies" className={styles.viewAll}>
            {content.viewAllText}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.8 3.4 11.5 7l-3.7 3.6" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
