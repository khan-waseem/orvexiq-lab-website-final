import React from 'react';

/** Line glyphs for the four process steps, drawn inline so they take the
 *  card's colour and stay crisp at any density. */

const base = {
  width: 46,
  height: 46,
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Magnifier — discover. */
const Discover: React.FC = () => (
  <svg {...base}>
    <circle cx="17.5" cy="17.5" r="9.5" />
    <path d="m24.6 24.6 7.4 7.4" />
  </svg>
);

/** Crosshair on target — define. */
const Define: React.FC = () => (
  <svg {...base}>
    <circle cx="20" cy="20" r="10.5" />
    <circle cx="20" cy="20" r="5" />
    <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <path d="M20 5v4M20 31v4M5 20h4M31 20h4" />
  </svg>
);

/** Angle brackets — design and build. */
const Build: React.FC = () => (
  <svg {...base}>
    <path d="M14.5 13 6 20l8.5 7" />
    <path d="m25.5 13 8.5 7-8.5 7" />
    <path d="m22.5 10-5 20" />
  </svg>
);

/** Rising bars — evolve. */
const Evolve: React.FC = () => (
  <svg {...base}>
    <path d="M8 32h24" />
    <rect x="10" y="21" width="5.5" height="8" rx="1" />
    <rect x="18" y="15" width="5.5" height="14" rx="1" />
    <rect x="26" y="9" width="5.5" height="20" rx="1" />
  </svg>
);

export const STEP_ICONS = {
  discover: Discover,
  define: Define,
  build: Build,
  evolve: Evolve,
} as const;
