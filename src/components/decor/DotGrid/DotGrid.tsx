import React from 'react';
import styles from './DotGrid.module.css';

export interface DotGridProps {
  columns?: number;
  rows?: number;
  /** Distance between dot centres, in px. */
  gap?: number;
  /** Fade direction — dots dim away from this corner. */
  fade?: 'to-left' | 'to-right';
  className?: string;
}

/**
 * DotGrid Decor
 *
 * The small violet dot matrix tucked into a section corner. Dots fade out
 * across the grid so the block reads as light rather than as a pattern.
 */
export const DotGrid: React.FC<DotGridProps> = ({
  columns = 8,
  rows = 4,
  gap = 14,
  fade = 'to-left',
  className = '',
}) => {
  const dots = Array.from({ length: columns * rows }, (_, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const t = fade === 'to-left' ? col / (columns - 1) : 1 - col / (columns - 1);
    const opacity = 0.14 + t * 0.55 - (row / rows) * 0.06;
    return { col, row, opacity: Math.max(opacity, 0.06) };
  });

  return (
    <div
      className={[styles.grid, className].filter(Boolean).join(' ')}
      style={{
        width: columns * gap,
        height: rows * gap,
        gridTemplateColumns: `repeat(${columns}, ${gap}px)`,
        gridAutoRows: `${gap}px`,
      }}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <span key={`${d.col}-${d.row}`} className={styles.dot} style={{ opacity: d.opacity }} />
      ))}
    </div>
  );
};
