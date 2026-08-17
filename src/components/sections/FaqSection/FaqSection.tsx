import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import styles from './FaqSection.module.css';

/** Structural shape rather than one page's type, so the Services page and the
 *  service detail pages (whose FAQ carries no note) can both use this. */
export interface FaqContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  note?: string;
  items: { id: string; question: string; answer: string }[];
}

export interface FaqSectionProps {
  content: FaqContent;
}

/**
 * FaqSection — Figma node 123:2 (Page / Services / Section / FAQ)
 *
 * 1440 reference (section height 1560, padding 96/96):
 *   row 1248: intro 576 | gap 96 | faq-list 576
 *   intro: eyebrow(16) +24 headline(88, 36px/44px) +24 note(52, 16px/26px)
 *   item: 24px vertical padding, question(18px SemiBold) +12 answer(16px/26px)
 *
 * Rendered as a description list so the Q/A pairing is exposed to assistive
 * technology rather than being purely visual.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({ content }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="faq" className={styles.section}>
      <PageContainer>
        <div className={styles.row}>
          <div className={styles.intro}>
            <Eyebrow align="left" tone="muted">
              {content.eyebrow}
            </Eyebrow>

            <h2 className={styles.headline}>
              {content.headlineLine1}{' '}
              <br />
              {content.headlineLine2}
            </h2>

            {content.note ? <p className={styles.note}>{content.note}</p> : null}
          </div>

          <dl className={styles.faqList}>
            {content.items.map((item) => (
              <div key={item.id} className={styles.faqItem}>
                <dt className={styles.question}>{item.question}</dt>
                <dd className={styles.answer}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
