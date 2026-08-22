import React from 'react';

/**
 * Medallion glyphs for the four disciplines. Line art drawn inline so it
 * inherits the surrounding colour and keeps its hairlines at any density.
 *
 * Sits beside DisciplineMedallion rather than inside a section, because both
 * the landing cards and the service detail heroes draw from it.
 */

const base = {
  width: 54,
  height: 54,
  viewBox: '0 0 46 46',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Chess knight — strategy. */
const Strategy: React.FC = () => (
  <svg {...base}>
    <path d="M18.5 9.5c2.6-1.1 5.6-.4 7.6 1.6l6 6c1.6 1.6 2.5 3.8 2.5 6.1V33H14.4v-3.4c0-2.1.9-4 2.5-5.3l3.6-3-3.3 1.3-3-3.2 4.3-4V9.5Z" />
    <circle cx="21.8" cy="15.6" r="0.9" fill="currentColor" stroke="none" />
    <path d="M12 36.5h22" />
  </svg>
);

/** Bezier handles — product design. */
const ProductDesign: React.FC = () => (
  <svg {...base}>
    <path d="M12 32c0-9 5-16 11-16s11 7 11 16" />
    <path d="M23 20.5 16.5 32h13L23 20.5Z" />
    <circle cx="23" cy="12.5" r="2.6" />
    <circle cx="11" cy="33.5" r="2.4" />
    <circle cx="35" cy="33.5" r="2.4" />
    <path d="M23 15.1v3.2" />
  </svg>
);

/** Angle brackets — technology. */
const Technology: React.FC = () => (
  <svg {...base}>
    <path d="M17 16 9 23l8 7" />
    <path d="m29 16 8 7-8 7" />
    <path d="m26 13-6 20" />
  </svg>
);

/** Labelled chip — intelligence. */
const Intelligence: React.FC = () => (
  <svg {...base}>
    <rect x="13" y="13" width="20" height="20" rx="3" />
    <path d="M20.4 27.5 23 19l2.6 8.5M21.2 25h3.6M28.2 19v8.5" />
    <path d="M18 9.5v3.5M23 9.5v3.5M28 9.5v3.5M18 33v3.5M23 33v3.5M28 33v3.5" />
    <path d="M9.5 18H13M9.5 23H13M9.5 28H13M33 18h3.5M33 23h3.5M33 28h3.5" />
  </svg>
);

export const DISCIPLINE_ICONS = {
  strategy: Strategy,
  'product-design': ProductDesign,
  technology: Technology,
  intelligence: Intelligence,
} as const;

export type DisciplineId = keyof typeof DISCIPLINE_ICONS;
