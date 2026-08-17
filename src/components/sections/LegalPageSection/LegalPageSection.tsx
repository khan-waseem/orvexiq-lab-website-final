import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
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
 */
export const LegalPageSection: React.FC<LegalPageSectionProps> = ({ page }) => {
  return (
    <>
      <SectionWrapper theme="canvas" padding="custom" id="legal-hero" className={styles.heroSection}>
        <PageContainer>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.crumbList}>
              <li>
                <Link href="/" className={styles.crumbLink}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className={styles.crumbSep}>
                /
              </li>
              <li>
                <span className={styles.crumbCurrent} aria-current="page">
                  {page.title}
                </span>
              </li>
            </ol>
          </nav>

          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.updated}>{page.lastUpdated}</p>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper theme="canvas" padding="custom" id="legal-body" className={styles.bodySection}>
        <PageContainer>
          <div className={styles.row}>
            <nav className={styles.toc} aria-label="On this page">
              <p className={styles.tocLabel}>{page.tocLabel}</p>
              <ol className={styles.tocList}>
                {page.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={styles.tocLink}>
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

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
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  );
};
