import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './ServiceWhySection.module.css';

export interface ServiceWhySectionProps {
  content: ServiceDetailPage['why'];
}

/**
 * ServiceWhySection — Figma node 124:37
 *
 * 1440 reference (section height 326, padding 64/64):
 *   heading column | gap 96 | body paragraphs
 *   headline 40/48 Bold -0.8; paragraphs 17/29 Regular secondary
 */
export const ServiceWhySection: React.FC<ServiceWhySectionProps> = ({ content }) => {
  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="service-why"
      className={styles.section}
      ariaLabelledBy="service-why-heading"
    >
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <div className={styles.row}>
          <SectionHeading
            id="service-why-heading"
            eyebrow={content.eyebrow}
            rule="dot"
            align="left"
            className={styles.heading}
          >
            {content.headlineLine1}
            <br />
            <Accent>{content.headlineLine2}</Accent>
          </SectionHeading>

          <div className={styles.body}>
            {content.paragraphs.map((p) => (
              <p key={p} className={styles.paragraph}>{p}</p>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
