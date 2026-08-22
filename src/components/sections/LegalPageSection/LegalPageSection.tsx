import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { LegalPage } from '@/content/schemas/legal-page.schema';
import styles from './LegalPageSection.module.css';

export interface LegalPageSectionProps {
  page: LegalPage;
}

/**
 * Legal page — Figma nodes 36:2 (Privacy) and 37:2 (Terms), which share one
 * layout: Nav band -> Page Hero (339) -> Legal Body -> Footer.
 *
 * The body is a sticky "on this page" card beside numbered sections. Section
 * numbers come from array order rather than being stored, so inserting a
 * clause cannot leave the numbering and the contents list disagreeing.
 *
 * The hero is the shared PageHero, not a local one. It used to be the only hero
 * on the site with a breadcrumb and with GlowRings arcs behind it, which made
 * the legal pages read as though they came from a different site.
 */
export const LegalPageSection: React.FC<LegalPageSectionProps> = ({ page }) => {
  return (
    <>
      <PageHero
        id="legal-hero"
        eyebrow="Legal"
        headline={page.title}
        subdescription={page.lastUpdated}
      />

      <SectionWrapper theme="canvas" padding="custom" id="legal-body" className={styles.bodySection}>
        <SectionDots />

        <PageContainer className={styles.container}>
          <div className={styles.content}>
            {page.sections.map((s, i) => (
              <section key={s.id} id={s.id} className={styles.clause}>
                <h2 className={styles.clauseTitle}>
                  {i + 1}. {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className={styles.clauseBody}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  );
};
