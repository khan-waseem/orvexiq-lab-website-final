import React from 'react';
import styles from './GlowRings.module.css';

export interface GlowRingsProps {
  /** Which edge the concentric arcs bleed in from. */
  side: 'left' | 'right';
  /** Diameter of the outermost ring in px. */
  size?: number;
  /** Lit points that sit on the arcs, as [ringIndex, angleDeg] pairs. */
  sparks?: Array<[number, number]>;
  className?: string;
}

const RING_COUNT = 5;

/**
 * GlowRings Decor
 *
 * The concentric violet arcs that bleed in from the page edges behind most
 * landing sections, with a few lit points sitting on the rings. Pure
 * decoration — drawn as one inline SVG so the strokes stay crisp at any size.
 */
export const GlowRings: React.FC<GlowRingsProps> = ({
  side,
  size = 900,
  sparks = [[1, -28], [3, 18], [2, 62]],
  className = '',
}) => {
  const c = size / 2;
  const rings = Array.from({ length: RING_COUNT }, (_, i) => c - (i * size) / (RING_COUNT * 2.6));

  return (
    <div
      className={[styles.wrapper, styles[side], className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
        <defs>
          <radialGradient id={`ringFade-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="rgba(168, 85, 247, 0.30)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
          </radialGradient>
        </defs>

        {rings.map((r, i) => (
          <circle
            key={r}
            cx={c}
            cy={c}
            r={r}
            stroke={`url(#ringFade-${side})`}
            strokeWidth={i === 1 ? 1.4 : 1}
            opacity={1 - i * 0.14}
          />
        ))}

        {sparks.map(([ringIndex, angle]) => {
          const r = rings[Math.min(ringIndex, rings.length - 1)];
          const rad = (angle * Math.PI) / 180;
          const x = c + r * Math.cos(rad) * (side === 'left' ? 1 : -1);
          const y = c + r * Math.sin(rad);
          return (
            <g key={`${ringIndex}-${angle}`}>
              <circle cx={x} cy={y} r={7} fill="rgba(192, 132, 252, 0.18)" />
              <circle cx={x} cy={y} r={2.2} fill="#e9d5ff" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
