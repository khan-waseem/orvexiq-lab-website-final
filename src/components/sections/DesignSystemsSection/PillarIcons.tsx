import React from 'react';

/**
 * Line icons for the three design-system pillars. Drawn inline rather than
 * imported so they inherit `currentColor` from the card and stay crisp at any
 * density.
 */

const base = {
  width: 34,
  height: 34,
  viewBox: '0 0 34 34',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Stacked layers — the token foundation. */
export const TokensIcon: React.FC = () => (
  <svg {...base} aria-hidden="true">
    <path d="M17 4.5 30 11l-13 6.5L4 11l13-6.5Z" />
    <path d="M4 17.2 17 23.7l13-6.5" />
    <path d="M4 23.4 17 29.9l13-6.5" />
  </svg>
);

/** Bracketed frame with a dashed centre — a component boundary. */
export const ComponentsIcon: React.FC = () => (
  <svg {...base} aria-hidden="true">
    <path d="M4 11V4.5h6.5" />
    <path d="M23.5 4.5H30V11" />
    <path d="M30 23v6.5h-6.5" />
    <path d="M10.5 29.5H4V23" />
    <rect x="11" y="11" width="12" height="12" rx="1.5" strokeDasharray="3 3" />
  </svg>
);

/** Display — the shipped product. */
export const ProductIcon: React.FC = () => (
  <svg {...base} aria-hidden="true">
    <rect x="3.5" y="6" width="27" height="18" rx="2.5" />
    <path d="M13 29h8" />
    <path d="M17 24v5" />
  </svg>
);

export const PILLAR_ICONS = {
  tokens: TokensIcon,
  components: ComponentsIcon,
  product: ProductIcon,
} as const;
