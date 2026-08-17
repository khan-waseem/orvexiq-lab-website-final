import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { ServiceDetailBlock } from '@/content/schemas/services-page.schema';
import styles from './ServiceDetailSection.module.css';

export interface ServiceDetailSectionProps {
  blocks: ServiceDetailBlock[];
}

/**
 * ServiceDetailSection — Figma node 31:2 (Page / Services / Section / Service Detail)
 *
 * 1440 reference (section height 1606, padding 64 top):
 *   block 1248 wide: intro 460 | gap 96 | deliverables 692
 *   intro: number(27) +16 title(55) +16 body(84) +16 read-more(22) = 236
 *   deliverables: 338x52 chips, 2 per row, 16px gaps
 *   blocks pitch 365 (236 block + 64 gap + 1 rule + 64 gap)
 */
export const ServiceDetailSection: React.FC<ServiceDetailSectionProps> = ({ blocks }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="service-detail" className={styles.section}>
      <PageContainer>
        <ol className={styles.blockList}>
          {blocks.map((block, index) => (
            <li key={block.id} className={styles.blockItem}>
              {index > 0 && <span className={styles.rule} aria-hidden="true" />}

              <div className={styles.block}>
                <div className={styles.intro}>
                  <span className={styles.number} aria-hidden="true">
                    {block.stepNumber}
                  </span>
                  <h2 className={styles.title}>{block.title}</h2>
                  <p className={styles.body}>{block.description}</p>
                  <Link href={`/services/${block.slug}`} className={styles.readMore}>
                    <span>{block.readMoreLabel}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>

                <ul className={styles.deliverables}>
                  {block.deliverables.map((d) => (
                    <li key={d.id} className={styles.deliverable}>
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.deliverableLabel}>{d.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </PageContainer>
    </SectionWrapper>
  );
};
