import React from 'react';
import { DotGrid } from '@/components/decor/DotGrid';
import styles from './SectionDots.module.css';

export interface SectionDotsProps {
  columns?: number;
  rows?: number;
  className?: string;
}

/**
 * SectionDots Decor
 *
 * The dot pattern that closes each landing band: one block in the bottom-left
 * corner and one in the bottom-right, each fading inward from its own edge.
 *
 * The section it sits in must establish a positioning context (every landing
 * band already does).
 */
export const SectionDots: React.FC<SectionDotsProps> = ({
  columns = 7,
  rows = 4,
  className = '',
}) => (
  <div className={[styles.wrapper, className].filter(Boolean).join(' ')} aria-hidden="true">
    <DotGrid className={styles.left} columns={columns} rows={rows} fade="to-right" />
    <DotGrid className={styles.right} columns={columns} rows={rows} fade="to-left" />
  </div>
);
