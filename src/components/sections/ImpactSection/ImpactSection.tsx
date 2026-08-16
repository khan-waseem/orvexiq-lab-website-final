import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ImpactStatItem } from '@/content/schemas/impact-stat.schema';
import styles from './ImpactSection.module.css';

export interface ImpactSectionProps {
  stats: ImpactStatItem[];
}

/**
 * ImpactSection Component (1:1 Figma Match — Node 218:580)
 *
 * Compliance & Content Rules:
 * - Unverified metric claims (isVerified: false) render safe structural placeholders ("—")
 * - 100% content repository integration
 * - Reuses Eyebrow, SectionWrapper, PageContainer primitives
 * - 100% token governance
 */
export const ImpactSection: React.FC<ImpactSectionProps> = ({ stats }) => {
  return (
    <SectionWrapper theme="canvas" padding="md" id="impact">
      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Eyebrow Header */}
          <div className={styles.eyebrowGroup}>
            <Eyebrow align="left">IMPACT</Eyebrow>
          </div>

          {/* Stats Row Container */}
          <div className={styles.statsRow} role="region" aria-label="Key impact metrics">
            {stats.map((stat, index) => {
              const isVerified = stat.verification?.isVerified ?? false;
              const displayValue = isVerified ? stat.rawNumericValue : '—';

              return (
                <React.Fragment key={stat.id}>
                  {index > 0 && <div className={styles.divider} aria-hidden="true" />}
                  <div className={styles.statItem}>
                    <p
                      className={`${styles.metricValue} ${!isVerified ? styles.metricPlaceholder : ''}`}
                      aria-label={`${stat.displayLabel}: ${isVerified ? stat.rawNumericValue : 'Unverified placeholder metric'}`}
                    >
                      {displayValue}
                    </p>
                    <p className={styles.statLabel}>{stat.displayLabel}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
