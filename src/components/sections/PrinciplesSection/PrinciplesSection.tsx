import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { AboutPageContent } from '@/content/schemas/about-page.schema';
import styles from './PrinciplesSection.module.css';

export interface PrinciplesSectionProps {
  content: AboutPageContent['principles'];
}

/**
 * PrinciplesSection — Figma node 32:34 (Page / About / Section / Principles)
 *
 * 1440 reference (section height 584, padding 96 top / 128 bottom):
 *   headline 48px Bold, tracking -0.96 -> gap 64 -> row of four 294 cards
 *   card: glass, r16, padding 32, gap 16; title 20px Bold, body 15/24
 *
 * Same card geometry as the homepage Approach steps, but a distinct component:
 * these carry no step number and the row is a plain 4-up, not a numbered flow.
 */
export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ content }) => {
  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="principles"
      className={styles.section}
      ariaLabelledBy="principles-heading"
    >
      <GlowRings side="left" size={960} />
      <GlowRings side="right" size={840} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="principles-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          sub={content.subdescription}
          className={styles.heading}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <ul className={styles.row}>
          {content.items.map((item) => (
            <li key={item.id} className={styles.card}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </SectionWrapper>
  );
};
