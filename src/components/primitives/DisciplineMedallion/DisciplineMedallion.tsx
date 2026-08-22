import React from 'react';
import { DISCIPLINE_ICONS, type DisciplineId } from './icons';
import styles from './DisciplineMedallion.module.css';

export interface DisciplineMedallionProps {
  discipline: DisciplineId;
  /** 'md' is the card mark; 'lg' is the service detail hero. */
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * DisciplineMedallion — the ringed glyph standing for one of the four
 * disciplines.
 *
 * Shared on purpose. A visitor who clicks Strategy on the landing should meet
 * the same mark at the top of the strategy page; a separate 3D render there
 * made the two read as unrelated pages. Everything is drawn in markup, so it
 * takes its colour from the surrounding text and stays sharp at any size.
 */
export const DisciplineMedallion: React.FC<DisciplineMedallionProps> = ({
  discipline,
  size = 'md',
  className = '',
}) => {
  const Icon = DISCIPLINE_ICONS[discipline];

  return (
    <span
      className={[styles.medallion, size === 'lg' ? styles.lg : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.ring} aria-hidden="true" />
      <span className={`${styles.spark} ${styles.sparkA}`} aria-hidden="true" />
      <span className={`${styles.spark} ${styles.sparkB}`} aria-hidden="true" />
      <span className={`${styles.spark} ${styles.sparkC}`} aria-hidden="true" />
      <Icon />
    </span>
  );
};
