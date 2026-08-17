import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './RelatedWorkSection.module.css';

export interface RelatedWorkSectionProps {
  content: ServiceDetailPage['relatedWork'];
}

/**
 * RelatedWorkSection — Figma node 124:95
 *
 * A single full-width glass card linking to the case study that best
 * illustrates the service (title 26px Bold, body 16/26, trailing arrow).
 */
export const RelatedWorkSection: React.FC<RelatedWorkSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="related-work" className={styles.section}>
      <PageContainer>
        <div className={styles.eyebrowRow}>
          <Eyebrow align="left" tone="muted">
            {content.eyebrow}
          </Eyebrow>
        </div>

        <Link href={content.href} className={styles.card}>
          <span className={styles.text}>
            <span className={styles.title}>{content.title}</span>
            <span className={styles.body}>{content.body}</span>
          </span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </PageContainer>
    </SectionWrapper>
  );
};
