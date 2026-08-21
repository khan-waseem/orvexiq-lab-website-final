import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
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
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="story"
      className={styles.section}
      ariaLabelledBy="story-heading"
    >
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <div className={styles.row}>
          <SectionHeading
            id="story-heading"
            eyebrow={content.eyebrow}
            rule="dot"
            align="left"
            className={styles.heading}
          >
            {content.headlineLine1}
            <br />
            <Accent>{content.headlineAccent2}</Accent>
          </SectionHeading>

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
