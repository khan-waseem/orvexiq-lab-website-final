import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './LandingFaqSection.module.css';

export type LandingFaqContent = HomepageContent['faqSection'];

/** Shape the services pages still carry from the previous two-column FAQ. */
export interface LegacyFaqContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  note?: string;
  items: { id: string; question: string; answer: string }[];
}

export interface LandingFaqSectionProps {
  content: LandingFaqContent | LegacyFaqContent;
}

/**
 * Folds the older FAQ copy into this band's shape: the second headline line
 * becomes the accented run and the note becomes the supporting line, so every
 * page can share one FAQ component without rewriting its content file.
 */
const normalize = (content: LandingFaqContent | LegacyFaqContent): LandingFaqContent =>
  'headlineAccent2' in content
    ? content
    : {
        eyebrow: content.eyebrow,
        headlineLine1: content.headlineLine1,
        headlineAccent2: content.headlineLine2,
        subdescription: content.note ?? '',
        items: content.items,
      };

/**
 * LandingFaqSection — landing band six.
 *
 * Built on native <details>, so the accordion is keyboard operable, findable
 * by in-page search and works before hydration. The shared `name` makes the
 * group exclusive (opening one closes the rest) in browsers that support it;
 * elsewhere it degrades to letting several stay open, which is harmless.
 *
 * Used by the landing and the services pages alike; the older two-column FAQ
 * content is folded into this shape by `normalize`.
 */
export const LandingFaqSection: React.FC<LandingFaqSectionProps> = ({ content: rawContent }) => {
  const content = normalize(rawContent);

  return (
  <SectionWrapper
    id="faq"
    padding="custom"
    className={styles.section}
    ariaLabelledBy="faq-heading"
  >
    <GlowRings side="left" size={1080} />
    <GlowRings side="right" size={900} />
    <SectionDots />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="faq-heading"
        eyebrow={content.eyebrow}
        rule="dot"
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
};
