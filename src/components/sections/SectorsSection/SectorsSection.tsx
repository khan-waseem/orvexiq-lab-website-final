import React from 'react';
import { PageContainer } from '@/components/layout/Container';
import { Divider } from '@/components/primitives/Divider';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './SectorsSection.module.css';

export interface SectorsSectionProps {
  content: HomepageContent['sectorsSection'];
}

/**
 * SectorsSection Component (1:1 Figma Match — Node 218:279)
 *
 * Displays "SECTORS WE BUILD IN" eyebrow, sector items text band (45% opacity),
 * and horizontal rule divider.
 * 100% token-governed and content-independent.
 */
export const SectorsSection: React.FC<SectorsSectionProps> = ({ content }) => {
  return (
    <section className={styles.sectorsSection} aria-label="Sectors We Build In">
      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Eyebrow Label */}
          <p className={styles.eyebrowText}>{content.eyebrow}</p>

          {/* Sector Items Text Band */}
          <ul className={styles.sectorsList}>
            {content.sectors.map((sector) => (
              <li key={sector.id} className={styles.sectorItem}>
                {sector.name}
              </li>
            ))}
          </ul>

          {/* Horizontal Rule Divider */}
          <Divider orientation="horizontal" />
        </div>
      </PageContainer>
    </section>
  );
};
