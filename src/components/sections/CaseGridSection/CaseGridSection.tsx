'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Tag } from '@/components/primitives/Tag';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { CaseMockup } from '@/components/sections/SelectedWorkSection/CaseMockup';
import { FeaturedCase } from './FeaturedCase';
import { CaseStudyItem } from '@/content/schemas/case-study.schema';
import { CaseStudiesPageContent } from '@/content/schemas/case-studies-page.schema';
import styles from './CaseGridSection.module.css';

export interface CaseGridSectionProps {
  content: CaseStudiesPageContent['grid'];
  caseStudies: CaseStudyItem[];
  /** Slugs that have a written detail page. Cards outside this list render as
   *  cards rather than links, so nothing on the grid leads to a 404. */
  readableSlugs: string[];
}

/**
 * CaseGridSection — Figma node 44:24 (Page / Case Studies / Section / Case Grid)
 *
 * 1440 reference (section height 1880):
 *   filters y=32 (43 tall) -> grid y=123
 *   card 612x527 = project-visual 320 + body 207 (padding 32, gap 12)
 *   grid gutters 24 both axes
 *
 * Figma draws the filter row as a static active state; here it is a real
 * client-side filter, which is what a filter row implies. The count label
 * follows the active filter.
 *
 * Card visuals fall back to the shared CaseMockup — the same markup-built
 * console used on the landing — so a card without exported project imagery
 * still shows a screen rather than an empty gradient box.
 */
interface CaseCardProps {
  item: CaseStudyItem;
  content: CaseStudiesPageContent['grid'];
  readable: boolean;
}

/** A card is a link only when its write-up exists; otherwise it stays a card
 *  and says so, rather than sending the reader to a 404. */
const CaseCard: React.FC<CaseCardProps> = ({ item, content, readable }) => {
  const inner = (
    <>
      <div className={styles.visual}>
        {item.coverScreenAssetUrl ? (
          <Image
            src={item.coverScreenAssetUrl}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 612px"
            className={styles.visualImage}
          />
        ) : (
          <div className={styles.visualMockup}>
            <CaseMockup label={item.title} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.tagRow}>
          <Tag variant="category">{item.category}</Tag>
          {item.clientDescriptor ? (
            <span className={styles.client}>{item.clientDescriptor}</span>
          ) : null}
          {!readable && <span className={styles.pending}>{content.comingSoonLabel}</span>}
        </div>

        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.outcome}>{item.subtitle}</p>
        <p className={styles.meta}>
          {[item.year, ...item.servicesProvided].filter(Boolean).join(' · ')}
        </p>
      </div>
    </>
  );

  if (!readable) {
    return <article className={`${styles.card} ${styles.cardPending}`}>{inner}</article>;
  }

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className={styles.card}
      aria-label={`View case study: ${item.title}`}
    >
      {inner}
    </Link>
  );
};

export const CaseGridSection: React.FC<CaseGridSectionProps> = ({
  content,
  caseStudies,
  readableSlugs,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      caseStudies
        .filter((c) => c.published)
        .filter((c) => activeFilter === null || c.category === activeFilter)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [caseStudies, activeFilter]
  );

  const countLabel = visible.length === 1 ? content.countLabelSingular : content.countLabelPlural;

  /* The lead card promotes the first case study that actually has a write-up,
     and only on the unfiltered view — picking a filter is a request for the
     grid itself, not for a promoted item. */
  const lead =
    activeFilter === null ? visible.find((c) => readableSlugs.includes(c.slug)) : undefined;
  const gridItems = lead ? visible.filter((c) => c.id !== lead.id) : visible;

  return (
    <SectionWrapper theme="canvas" padding="custom" id="case-grid" className={styles.section}>
      <GlowRings side="left" size={1020} />
      <GlowRings side="right" size={900} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="case-grid-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          sub={content.subdescription}
          className={styles.heading}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        {/* Filter pills with a right-aligned count */}
        <div className={styles.filters}>
          <div className={styles.filterGroup} role="group" aria-label="Filter case studies by sector">
            {content.filters.map((f) => {
              const isActive = activeFilter === f.value;
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.filter} ${isActive ? styles.filterActive : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(f.value)}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <p className={styles.count} aria-live="polite">
            {visible.length} {countLabel}
          </p>
        </div>

        {lead && <FeaturedCase item={lead} ctaLabel={content.leadCtaLabel} />}

        {visible.length === 0 ? (
          <p className={styles.empty}>{content.emptyLabel}</p>
        ) : (
          <ul className={styles.grid}>
            {gridItems.map((item) => (
              <li key={item.id} className={styles.gridItem}>
                <CaseCard item={item} content={content} readable={readableSlugs.includes(item.slug)} />
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </SectionWrapper>
  );
};
