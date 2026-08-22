import React from 'react';

/** Line glyphs for the case categories, drawn inline so they inherit colour. */

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Bank colonnade. */
const Fintech: React.FC = () => (
  <svg {...base}>
    <path d="M2 6.2 8 2.6l6 3.6" />
    <path d="M3.6 6.8v5M6.6 6.8v5M9.4 6.8v5M12.4 6.8v5" />
    <path d="M2.4 13.4h11.2" />
  </svg>
);

/** Delivery truck. */
const Logistics: React.FC = () => (
  <svg {...base}>
    <path d="M1.6 4.4h7.2v6.4H1.6z" />
    <path d="M8.8 6.8h2.8l1.8 2v2h-4.6z" />
    <circle cx="4.4" cy="12.4" r="1.4" />
    <circle cx="11" cy="12.4" r="1.4" />
  </svg>
);

/** Shopping bag. */
const Commerce: React.FC = () => (
  <svg {...base}>
    <path d="M3 5.2h10l-.9 8.2H3.9L3 5.2Z" />
    <path d="M6 5.2V4a2 2 0 0 1 4 0v1.2" />
  </svg>
);

/** Vault dial. */
const Treasury: React.FC = () => (
  <svg {...base}>
    <rect x="2.2" y="2.6" width="11.6" height="10.8" rx="1.6" />
    <circle cx="8" cy="8" r="2.6" />
    <path d="M8 3.6v1.8M8 10.6v1.8M3.6 8h1.8M10.6 8h1.8" />
  </svg>
);

/** Node cluster — the AI work. */
const Ai: React.FC = () => (
  <svg {...base}>
    <circle cx="8" cy="8" r="2.2" />
    <circle cx="3" cy="4.4" r="1.3" />
    <circle cx="13" cy="4.4" r="1.3" />
    <circle cx="3.6" cy="12.4" r="1.3" />
    <circle cx="12.6" cy="12" r="1.3" />
    <path d="m4.1 5.2 2.3 1.6M11.9 5.2 9.7 6.8M4.7 11.5 6.6 9.7M11.5 11.2 9.6 9.6" />
  </svg>
);

/** Cross in a rounded frame — healthcare. */
const Healthcare: React.FC = () => (
  <svg {...base}>
    <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="2.6" />
    <path d="M8 5.2v5.6M5.2 8h5.6" />
  </svg>
);

/** Overlapping marks — brand. */
const Brand: React.FC = () => (
  <svg {...base}>
    <circle cx="6.2" cy="8" r="3.8" />
    <circle cx="9.8" cy="8" r="3.8" />
  </svg>
);

/** Handset — mobile. */
const Mobile: React.FC = () => (
  <svg {...base}>
    <rect x="4.4" y="1.8" width="7.2" height="12.4" rx="1.8" />
    <path d="M7 3.6h2" />
    <circle cx="8" cy="11.8" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

/** Layered planes — the catch-all. */
const General: React.FC = () => (
  <svg {...base}>
    <path d="M8 2.4 14 5.6 8 8.8 2 5.6 8 2.4Z" />
    <path d="m2 9 6 3.2L14 9" />
  </svg>
);

export const CATEGORY_ICONS = {
  FINTECH: Fintech,
  HEALTHCARE: Healthcare,
  BRAND: Brand,
  MOBILE: Mobile,
  LOGISTICS: Logistics,
  COMMERCE: Commerce,
  TREASURY: Treasury,
  AI: Ai,
  GENERAL: General,
} as const;
