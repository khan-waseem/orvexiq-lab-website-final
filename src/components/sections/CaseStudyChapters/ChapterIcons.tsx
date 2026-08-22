import React from 'react';

/** Line glyphs for chapter diagrams. Drawn inline so they take the tone
 *  colour of whatever card they sit in. */

const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 26 26',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Stacked discs — a data source. */
const Data: React.FC = () => (
  <svg {...base}>
    <ellipse cx="13" cy="7" rx="7.5" ry="3" />
    <path d="M5.5 7v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V7" />
    <path d="M5.5 13v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
  </svg>
);

/** Shield — something protected. */
const Shield: React.FC = () => (
  <svg {...base}>
    <path d="M13 3.2 21 6v6.4c0 4.6-3.3 8.2-8 9.4-4.7-1.2-8-4.8-8-9.4V6l8-2.8Z" />
    <path d="m9.6 12.6 2.4 2.4 4.6-4.8" />
  </svg>
);

/** Plotted points — a projection. */
const Scenario: React.FC = () => (
  <svg {...base}>
    <path d="m4 17 5-5 4 3 9-9" />
    <circle cx="9" cy="12" r="1.6" />
    <circle cx="13" cy="15" r="1.6" />
    <path d="M18 6h4v4" />
  </svg>
);

/** Ruled document — the policy being applied. */
const Rules: React.FC = () => (
  <svg {...base}>
    <path d="M6 3.4h10l4 4v15.2H6z" />
    <path d="M16 3.4v4h4" />
    <path d="M9.4 12.4h7M9.4 16.4h7" />
  </svg>
);

/** Check in a ring — the verdict. */
const Verdict: React.FC = () => (
  <svg {...base}>
    <circle cx="13" cy="13" r="9.4" />
    <path d="m8.8 13.2 2.9 2.9 5.5-5.8" />
  </svg>
);

/** Clock — a moment in a sequence. */
const Clock: React.FC = () => (
  <svg {...base}>
    <circle cx="13" cy="13" r="9.4" />
    <path d="M13 7.6V13l3.6 2.2" />
  </svg>
);

/** Warning — the moment something breaks. */
const Alert: React.FC = () => (
  <svg {...base}>
    <path d="M13 4.4 22.4 20.6H3.6L13 4.4Z" />
    <path d="M13 10.6v4.2" />
    <circle cx="13" cy="17.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const CHAPTER_ICONS = {
  data: Data,
  shield: Shield,
  scenario: Scenario,
  rules: Rules,
  verdict: Verdict,
  clock: Clock,
  alert: Alert,
} as const;

export type ChapterIconName = keyof typeof CHAPTER_ICONS;
