import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './LandingFaqSection.module.css';

export interface LandingFaqSectionProps {
  content: HomepageContent['faqSection'];
}

/**
 * LandingFaqSection — landing band six.
 *
 * Built on native <details>, so the accordion is keyboard operable, findable
 * by in-page search and works before hydration. The shared `name` makes the
 * group exclusive (opening one closes the rest) in browsers that support it;
 * elsewhere it degrades to letting several stay open, which is harmless.
 *
 * The services pages keep the existing two-column FaqSection — this is the
 * landing's numbered accordion treatment, not a replacement for it.
 */
export const LandingFaqSection: React.FC<LandingFaqSectionProps> = ({ content }) => (
  <SectionWrapper
    id="faq"
    padding="custom"
    className={styles.section}
    ariaLabelledBy="faq-heading"
  >
    <GlowRings side="left" size={1080} sparks={[[1, -20], [2, 22], [3, 58]]} />
    <GlowRings side="right" size={900} sparks={[[2, 168]]} />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="faq-heading"
        eyebrow={content.eyebrow}
        sub={content.subdescription}
      >
        {content.headlineLine1}
        <br />
        <Accent>{content.headlineAccent2}</Accent>
      </SectionHeading>

      <div className={styles.list}>
        {content.items.map((item, index) => (
          <details
            key={item.id}
            className={styles.item}
            name="landing-faq"
            open={index === 0}
          >
            <summary className={styles.head}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.question}>{item.question}</span>
              <span className={styles.toggle} aria-hidden="true" />
            </summary>

            <div className={styles.answerWrap}>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </PageContainer>
  </SectionWrapper>
);
