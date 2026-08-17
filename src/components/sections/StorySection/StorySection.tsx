import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { AboutPageContent } from '@/content/schemas/about-page.schema';
import styles from './StorySection.module.css';

export interface StorySectionProps {
  content: AboutPageContent['story'];
}

/**
 * StorySection — Figma node 32:24 (Page / About / Section / Story)
 *
 * 1440 reference (section height 514, padding 128/128):
 *   heading 460 | gap 96 | body fills
 *   headline 44px / 52px Bold, tracking -0.88 (3 lines)
 *   body paragraphs 18px / 30px Regular, secondary, 24px gaps
 */
export const StorySection: React.FC<StorySectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="story" className={styles.section}>
      <PageContainer>
        <div className={styles.row}>
          <div className={styles.heading}>
            <Eyebrow align="left" tone="muted">
              {content.eyebrow}
            </Eyebrow>

            {/* The space before each <br /> matters: the breaks are hidden at
                <=600px so the headline can reflow to the phone measure, and
                without it the lines would concatenate ("productsfail"). */}
            <h2 className={styles.headline}>
              {content.headlineLines.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 ? (
                    <>
                      {' '}
                      <br />
                    </>
                  ) : null}
                  {line}
                </React.Fragment>
              ))}
            </h2>
          </div>

          <div className={styles.body}>
            {content.paragraphs.map((p) => (
              <p key={p} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
