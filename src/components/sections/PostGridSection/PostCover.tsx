import React from 'react';
import styles from './PostCover.module.css';

export interface PostCoverProps {
  /** Drives the mark and the tint, so a category always looks the same. */
  category: string;
  title: string;
}

/* Covers are drawn rather than photographed: the posts ship no imagery, and a
   generated panel is honest about that where a stock photo would not be. Each
   category gets its own mark and hue so the grid reads as a set. */

type CoverKey = 'design-systems' | 'product-design' | 'research' | 'process' | 'general';

const KEY_BY_CATEGORY: Record<string, CoverKey> = {
  'Design systems': 'design-systems',
  'Product design': 'product-design',
  Research: 'research',
  Process: 'process',
};

/** Stacked planes — a system built in layers. */
const DesignSystems: React.FC = () => (
  <>
    <path d="M60 42 96 24l36 18-36 18-36-18Z" />
    <path d="m60 60 36 18 36-18" />
    <path d="m60 78 36 18 36-18" />
  </>
);

/** Frame with a focus point — an interface decision. */
const ProductDesign: React.FC = () => (
  <>
    <rect x="58" y="26" width="76" height="60" rx="6" />
    <path d="M58 44h76" />
    <circle cx="96" cy="66" r="10" />
  </>
);

/** Magnifier — research. */
const Research: React.FC = () => (
  <>
    <circle cx="90" cy="52" r="24" />
    <path d="m108 70 18 18" />
  </>
);

/** Linked steps — process. */
const Process: React.FC = () => (
  <>
    <circle cx="64" cy="56" r="10" />
    <circle cx="96" cy="56" r="10" />
    <circle cx="128" cy="56" r="10" />
    <path d="M74 56h12M106 56h12" />
  </>
);

const MARKS: Record<CoverKey, React.FC> = {
  'design-systems': DesignSystems,
  'product-design': ProductDesign,
  research: Research,
  process: Process,
  general: DesignSystems,
};

export const PostCover: React.FC<PostCoverProps> = ({ category, title }) => {
  const key = KEY_BY_CATEGORY[category] ?? 'general';
  const Mark = MARKS[key];

  return (
    <div className={`${styles.cover} ${styles[key]}`} role="img" aria-label={`${title} — ${category}`}>
      <span className={styles.wash} aria-hidden="true" />

      <svg className={styles.mark} viewBox="0 0 192 112" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <Mark />
        </g>
      </svg>

      <span className={styles.category} aria-hidden="true">
        {category}
      </span>
    </div>
  );
};
