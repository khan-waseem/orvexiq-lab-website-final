import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './ServiceIncludesSection.module.css';

export interface ServiceIncludesSectionProps {
  content: ServiceDetailPage['includes'];
}

/**
 * ServiceIncludesSection — Figma node 124:47
 *
 * 1440 reference (padding 64/64, 48px below the eyebrow):
 *   3-up grid, 24px gutters; each item carries a 2px brand rule on top,
 *   24px padding above the 20px Bold title, then 15/25 body.
 */
export const ServiceIncludesSection: React.FC<ServiceIncludesSectionProps> = ({ content }) => {
  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="service-includes"
      className={styles.section}
      ariaLabelledBy="service-includes-heading"
    >
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="service-includes-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          className={styles.heading}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <ul className={styles.grid}>
          {content.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </SectionWrapper>
  );
};
