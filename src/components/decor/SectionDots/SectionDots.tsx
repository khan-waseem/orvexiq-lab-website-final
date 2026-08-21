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
 * The dot pattern that frames each landing band: one block where the section
 * starts, on the right, and one where it ends, on the left — each fading
 * inward from its own edge so the pair reads as a diagonal.
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
    <DotGrid className={styles.start} columns={columns} rows={rows} fade="to-left" />
    <DotGrid className={styles.end} columns={columns} rows={rows} fade="to-right" />
  </div>
);
