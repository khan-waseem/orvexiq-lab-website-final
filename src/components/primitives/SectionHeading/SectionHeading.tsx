import React from 'react';
import { PillEyebrow } from '@/components/primitives/PillEyebrow';
import styles from './SectionHeading.module.css';

export type SectionHeadingRule = 'none' | 'dot' | 'solid';
export type SectionHeadingSize = 'md' | 'lg';

export interface SectionHeadingProps {
  /** Capsule label above the headline. Omit for sections that have none. */
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ReactNode;
  /** Headline content — wrap the highlighted words in <Accent>. */
  children: React.ReactNode;
  sub?: React.ReactNode;
  rule?: SectionHeadingRule;
  /** 'lg' is the oversized CTA headline; every other band uses 'md'. */
  size?: SectionHeadingSize;
  align?: 'center' | 'left';
  /** Heading level; sections below the hero use h2. */
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

/** Violet gradient run inside a display headline. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.accent}>{children}</span>
);

/**
 * SectionHeading Primitive
 *
 * The eyebrow / serif headline / rule / sub-copy stack shared by the landing
 * sections. The rule and eyebrow are decorative; only text is announced.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  eyebrowIcon,
  children,
  sub,
  rule = 'none',
  size = 'md',
  align = 'center',
  as: Tag = 'h2',
  id,
  className = '',
}) => (
  <div
    className={[styles.heading, align === 'left' ? styles.alignLeft : '', className]
      .filter(Boolean)
      .join(' ')}
  >
    {eyebrow && (
      <PillEyebrow className={styles.eyebrow} icon={eyebrowIcon}>
        {eyebrow}
      </PillEyebrow>
    )}

    <Tag id={id} className={`${styles.title} ${size === 'lg' ? styles.titleLg : ''}`}>
      {children}
    </Tag>

    {rule === 'dot' && (
      <div className={styles.rule} aria-hidden="true">
        <span className={styles.ruleLine} />
        <span className={styles.ruleDot} />
        <span className={`${styles.ruleLine} ${styles.ruleLineRight}`} />
      </div>
    )}

    {rule === 'solid' && <div className={styles.ruleSolid} aria-hidden="true" />}

    {sub && <p className={styles.sub}>{sub}</p>}
  </div>
);
