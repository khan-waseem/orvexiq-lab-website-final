import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { DotGrid } from '@/components/decor/DotGrid';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { STEP_ICONS } from './StepIcons';
import styles from './ApproachSection.module.css';

export interface ApproachSectionProps {
  content: HomepageContent['approachSection'];
}

/** Violet arrow marking the hand-off from one stage to the next. */
const StepArrow: React.FC = () => (
  <span className={styles.arrow} aria-hidden="true">
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <path d="M0 6h23M18.5 1.5 24 6l-5.5 4.5" stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/**
 * ApproachSection — landing band five, "Our Process".
 *
 * Four stage cards read left to right with an arrow between each. The number,
 * glyph frame, title rule and the dot texture inside the outer cards are all
 * drawn in markup.
 */
export const ApproachSection: React.FC<ApproachSectionProps> = ({ content }) => (
  <SectionWrapper
    padding="custom"
    className={styles.section}
    ariaLabelledBy="approach-heading"
  >
    <GlowRings side="left" size={1020} sparks={[[1, -30], [3, 30]]} />
    <GlowRings side="right" size={940} sparks={[[2, 165], [1, 198]]} />
    <DotGrid className={styles.dots} columns={7} rows={4} fade="to-right" />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="approach-heading"
        eyebrow={content.eyebrow}
        rule="solid"
        sub={content.subdescription}
      >
        {content.headline}
        <Accent>{content.headlineAccent}</Accent>
      </SectionHeading>

      <ol className={styles.steps}>
        {content.steps.map((step, index) => {
          const Icon = STEP_ICONS[step.icon];
          const isEdgeCard = index === 0 || index === content.steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {index > 0 && <StepArrow />}

              <li className={styles.step}>
                <span className={styles.stepNumber}>{step.stepNumber}</span>

                <span className={styles.iconFrame}>
                  <Icon />
                </span>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <span className={styles.titleRule} aria-hidden="true" />
                <p className={styles.stepBody}>{step.description}</p>

                {/* The first and last cards carry a dot texture in the design. */}
                {isEdgeCard && (
                  <DotGrid
                    className={styles.stepTexture}
                    columns={6}
                    rows={3}
                    gap={10}
                    fade={index === 0 ? 'to-right' : 'to-left'}
                  />
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </PageContainer>
  </SectionWrapper>
);
