'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Tag } from '@/components/primitives/Tag';
import { CaseStudyItem } from '@/content/schemas/case-study.schema';
import { CaseStudiesPageContent } from '@/content/schemas/case-studies-page.schema';
import styles from './CaseGridSection.module.css';

export interface CaseGridSectionProps {
  content: CaseStudiesPageContent['grid'];
  caseStudies: CaseStudyItem[];
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
 * Card visuals are the Figma gradient placeholder ("Project visual"): the
 * design ships no exported project imagery, so nothing is substituted for it.
 */
export const CaseGridSection: React.FC<CaseGridSectionProps> = ({ content, caseStudies }) => {
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

  return (
    <SectionWrapper theme="canvas" padding="custom" id="case-grid" className={styles.section}>
      <PageContainer>
        {/* Figma 44:25 — filter pills with a right-aligned count */}
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

        {visible.length === 0 ? (
          <p className={styles.empty}>{content.emptyLabel}</p>
        ) : (
          <ul className={styles.grid}>
            {visible.map((item) => (
              <li key={item.id} className={styles.gridItem}>
                <Link
                  href={`/case-studies/${item.slug}`}
                  className={styles.card}
                  aria-label={`View case study: ${item.title}`}
                >
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
                      <span className={styles.visualPlaceholder}>
                        {content.visualPlaceholderLabel}
                      </span>
                    )}
                  </div>

                  <div className={styles.body}>
                    <div className={styles.tagRow}>
                      <Tag variant="category">{item.category}</Tag>
                      {item.clientDescriptor ? (
                        <span className={styles.client}>{item.clientDescriptor}</span>
                      ) : null}
                    </div>

                    <h2 className={styles.title}>{item.title}</h2>
                    <p className={styles.outcome}>{item.subtitle}</p>
                    <p className={styles.meta}>
                      {[item.year, ...item.servicesProvided].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </SectionWrapper>
  );
};
