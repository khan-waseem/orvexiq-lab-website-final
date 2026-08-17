import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
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
    <SectionWrapper theme="canvas" padding="custom" id="service-why" className={styles.section}>
      <PageContainer>
        <div className={styles.row}>
          <div className={styles.heading}>
            <Eyebrow align="left" tone="muted">{content.eyebrow}</Eyebrow>
            <h2 className={styles.headline}>
              {content.headlineLine1}{' '}
              <br />
              {content.headlineLine2}
            </h2>
          </div>

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
