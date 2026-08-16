import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Tag } from '@/components/primitives/Tag';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { CaseStudy } from '@/content/schemas/case-study.schema';
import styles from './SelectedWorkSection.module.css';

export interface SelectedWorkSectionProps {
  content: HomepageContent['selectedWorkSection'];
  caseStudies: CaseStudy[];
}

/**
 * SelectedWorkSection Component (1:1 Figma Match — Node 218:431)
 *
 * Requirements:
 * - Scalable route `/case-studies/[slug]`
 * - Verified/unverified content compliance
 * - Reuses existing Eyebrow, Tag, SectionWrapper, PageContainer primitives
 * - 100% token governance
 */
export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  content,
  caseStudies,
}) => {
  return (
    <SectionWrapper theme="canvas" padding="lg" id="work">
      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Header Row Composition */}
          <div className={styles.headerRow}>
            <div className={styles.titleGroup}>
              <Eyebrow align="left">{content.eyebrow}</Eyebrow>
              <h2 className={styles.headlineText}>
                {content.headlineLine1}
                <br />
                {content.headlineLine2}
              </h2>
            </div>

            {/* View All Case Studies Link */}
            <Link href="/case-studies" className={styles.viewAllLink} aria-label="View all case studies">
              <span>{content.viewAllText}</span>
              <span className={styles.arrowIcon} aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 2-Column Responsive Cards Grid */}
          <div className={styles.cardsGrid}>
            {caseStudies.map((item) => (
              <Link
                key={item.id}
                href={`/case-studies/${item.slug}`}
                className={styles.cardLink}
                aria-label={`View Case Study: ${item.title}`}
              >
                {/* Project Cover Screen Image */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.coverScreenAssetUrl || '/assets/screens/case-screen-1.png'}
                    alt={`Preview mockup for ${item.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 612px"
                    className={styles.screenImage}
                  />
                </div>

                {/* Card Details Body */}
                <div className={styles.cardBody}>
                  <div className={styles.tagRow}>
                    <Tag variant="category">{item.category}</Tag>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.subtitle || item.description}</p>

                  <span className={styles.servicesMeta}>
                    {item.servicesProvided.join(' · ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
