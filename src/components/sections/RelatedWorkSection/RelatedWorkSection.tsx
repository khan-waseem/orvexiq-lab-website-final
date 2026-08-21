import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
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
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="related-work"
      className={styles.section}
      ariaLabelledBy="related-work-heading"
    >
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="related-work-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          align="left"
          className={styles.heading}
        >
          {content.title}
        </SectionHeading>

        <Link href={content.href} className={styles.card}>
          <span className={styles.text}>
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
