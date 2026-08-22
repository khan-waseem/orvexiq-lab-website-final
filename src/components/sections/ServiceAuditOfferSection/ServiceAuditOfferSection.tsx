import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './ServiceAuditOfferSection.module.css';

export interface ServiceAuditOfferSectionProps {
  content: NonNullable<ServiceDetailPage['auditOffer']>;
}

/**
 * ServiceAuditOfferSection — Figma node 139:71
 *
 * Design Systems only. A single glass card offering the fixed-scope audit as
 * an entry point: copy column on the left, outcome bullets on the right.
 */
export const ServiceAuditOfferSection: React.FC<ServiceAuditOfferSectionProps> = ({
  content,
}) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="audit-offer" className={styles.section}>
      <GlowRings side="left" size={960} />
      <GlowRings side="right" size={840} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <div className={styles.card}>
          <div className={styles.copy}>
            {/* The shared band heading rather than a local eyebrow + h2, so this
                card carries the same eyebrow capsule, serif headline and
                accented run as every other section on the site. */}
            <SectionHeading
              eyebrow={content.eyebrow}
              rule="dot"
              align="left"
              className={styles.heading}
            >
              {content.headlineLine1} <Accent>{content.headlineAccent2}</Accent>
            </SectionHeading>

            <p className={styles.body}>{content.body}</p>
            <p className={styles.priceNote}>{content.priceNote}</p>
          </div>

          <ul className={styles.list}>
            {content.items.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
