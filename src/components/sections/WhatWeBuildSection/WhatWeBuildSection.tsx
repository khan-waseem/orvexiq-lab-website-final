import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { DisciplineMedallion } from '@/components/primitives/DisciplineMedallion';
import styles from './WhatWeBuildSection.module.css';

export interface WhatWeBuildSectionProps {
  content: HomepageContent['whatWeBuildSection'];
}

/** Lit thread running between the medallions, tying the four cards together. */
const Connector: React.FC = () => (
  <span className={styles.connector} aria-hidden="true">
    <span className={styles.connectorLine} />
    <span className={styles.connectorDot} />
    <span className={styles.connectorLine} />
  </span>
);

/**
 * WhatWeBuildSection — landing band four.
 *
 * Four discipline cards joined left to right by a connector thread, so the
 * row reads as one system rather than four separate services. The medallions
 * are drawn in markup, and the service detail hero shows the same one, so a
 * card and the page it opens are visibly the same thing.
 *
 * Each card links to its service page. The whole card is the target — a small
 * button would be the only clickable part of a large, obviously clickable
 * surface — with a visible "View details" affordance so it does not rely on
 * hover to announce itself.
 */
export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({ content }) => (
  <SectionWrapper
    padding="custom"
    className={styles.section}
    ariaLabelledBy="what-we-build-heading"
  >
    <GlowRings side="right" size={1240} />
    <GlowRings side="left" size={880} />
    <SectionDots />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="what-we-build-heading"
        eyebrow={content.eyebrow}
        rule="dot"
        sub={content.subdescription}
      >
        {content.headlineLine1}
        <br />
        {content.headlineLine2}
        <Accent>{content.headlineAccent2}</Accent>
      </SectionHeading>

      <ul className={styles.row}>
        {content.disciplines.map((discipline, index) => (
          <React.Fragment key={discipline.id}>
            {index > 0 && <Connector />}

            <li className={styles.card}>
              <Link href={discipline.href} className={styles.cardLink}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>

                <DisciplineMedallion
                  discipline={discipline.id}
                  className={styles.medallion}
                />

                <h3 className={styles.cardTitle}>{discipline.title}</h3>
                <p className={styles.cardBody}>{discipline.body}</p>

                <span className={styles.cardCta}>
                  {content.cardCtaText}
                  <span className={styles.cardCtaIcon} aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2.6 6.5h7M6.9 3.7 9.7 6.5l-2.8 2.8" stroke="currentColor"
                            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>

      <div className={styles.ctaRow}>
        <Link href="/services" className={styles.cta}>
          {content.ctaText}
          <span className={styles.ctaIcon}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M3 7.5h8M8.2 4.3 11.4 7.5l-3.2 3.2" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </PageContainer>
  </SectionWrapper>
);
