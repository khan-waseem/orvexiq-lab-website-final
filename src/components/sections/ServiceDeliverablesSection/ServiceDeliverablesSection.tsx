import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './ServiceDeliverablesSection.module.css';

export interface ServiceDeliverablesSectionProps {
  content: ServiceDetailPage['deliverables'];
}

/**
 * ServiceDeliverablesSection — Figma node 124:71
 *
 * 1440 reference (padding 64/64):
 *   head column | gap 96 | list column
 *   headline 32/40 Bold -0.64; items 17/26 Medium with a brand bullet
 *
 * The bullet is a CSS dot rather than the exported SVG: it is a plain 7px
 * circle, so downloading an asset per bullet would be wasteful.
 */
export const ServiceDeliverablesSection: React.FC<ServiceDeliverablesSectionProps> = ({
  content,
}) => {
  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="service-deliverables"
      className={styles.section}
      ariaLabelledBy="service-deliverables-heading"
    >
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <div className={styles.row}>
          <SectionHeading
            id="service-deliverables-heading"
            eyebrow={content.eyebrow}
            rule="dot"
            align="left"
            className={styles.heading}
          >
            {content.headlineLine1}
            <br />
            <Accent>{content.headlineLine2}</Accent>
          </SectionHeading>

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
