import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './ApproachSection.module.css';

export interface ApproachSectionProps {
  content: HomepageContent['approachSection'];
}

/**
 * ApproachSection Component (1:1 Figma Match — Node 218:555)
 *
 * Requirements:
 * - 4 process stages: Discover (01), Define (02), Design (03), Deliver (04)
 * - Exact 1:1 Figma card proportions (294px min-width, 277px min-height, 128px top/bottom padding)
 * - 40px bold purple stage numbers, 22px bold stage titles, 15px/24px body text
 * - Reuses Eyebrow, SectionWrapper, PageContainer primitives
 * - 100% token-governed and content-repository compliant
 */
export const ApproachSection: React.FC<ApproachSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="lg" id="process" className={styles.approachSection}>
      {/* Ambient Top-Left Purple Glow (Node 218:556) */}
      <div className={styles.approachGlow} aria-hidden="true">
        <Image
          src="/assets/process/approach-glow.svg"
          alt=""
          width={632}
          height={632}
          className={styles.glowImage}
        />
      </div>

      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Header Block (Node 218:557) */}
          <div className={styles.headerBlock}>
            <Eyebrow align="left">{content.eyebrow}</Eyebrow>
            <Heading level="h2" align="left" className={styles.headlineText}>
              {content.headline}
            </Heading>
            <p className={styles.supportingText}>{content.subdescription}</p>
          </div>

          {/* 4-Stage Horizontal Grid (Node 218:563) */}
          <div className={styles.stepsGrid} role="list" aria-label="Process stages">
            {content.steps.map((step) => (
              <article key={step.id} className={styles.stepCard} role="listitem">
                <span className={styles.stepNumber} aria-label={`Step ${step.stepNumber}`}>
                  {step.stepNumber}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
