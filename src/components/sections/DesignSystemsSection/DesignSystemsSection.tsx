import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { PILLAR_ICONS } from './PillarIcons';
import { PILLAR_DEMOS } from './PillarDemos';
import styles from './DesignSystemsSection.module.css';

export interface DesignSystemsSectionProps {
  content: HomepageContent['designSystemsSection'];
}

/** Connector between the pillar cards — tokens feed components feed product. */
const FlowArrow: React.FC = () => (
  <span className={styles.arrow} aria-hidden="true">
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <path d="M0 6h23M18.5 1.5 24 6l-5.5 4.5" stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/**
 * DesignSystemsSection — landing band two.
 *
 * Three pillar cards (tokens -> components -> product), each carrying a small
 * working UI demo built in markup rather than a placed image, so it stays
 * sharp at every density and follows the theme tokens.
 */
export const DesignSystemsSection: React.FC<DesignSystemsSectionProps> = ({ content }) => (
  <SectionWrapper
    padding="custom"
    className={styles.section}
    ariaLabelledBy="design-systems-heading"
  >
    <GlowRings side="left" size={980} />
    <GlowRings side="right" size={860} />
    <SectionDots />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="design-systems-heading"
        eyebrow={content.eyebrow}
        rule="dot"
        sub={content.subdescription}
      >
        {content.headlineLine1}
        <Accent>{content.headlineAccent1}</Accent>
        <br />
        {content.headlineLine2}
        <Accent>{content.headlineAccent2}</Accent>
      </SectionHeading>

      <ul className={styles.pillars}>
        {content.pillars.map((pillar, index) => {
          const Icon = PILLAR_ICONS[pillar.id];
          const Demo = PILLAR_DEMOS[pillar.id];

          return (
            <React.Fragment key={pillar.id}>
              {index > 0 && <FlowArrow />}

              <li className={styles.card}>
                <span className={styles.iconFrame}>
                  <Icon />
                </span>

                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardBody}>{pillar.body}</p>

                <div className={styles.cardDemo} aria-hidden="true">
                  <Demo />
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </PageContainer>

    <div className={styles.floorGlow} aria-hidden="true" />
  </SectionWrapper>
);
