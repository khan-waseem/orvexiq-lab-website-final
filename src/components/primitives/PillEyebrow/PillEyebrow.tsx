import React, { HTMLAttributes } from 'react';
import styles from './PillEyebrow.module.css';

export interface PillEyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Optional leading glyph inside the capsule (the CTA band uses a spark). */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * PillEyebrow Primitive
 *
 * Section label used across the landing page: a violet capsule flanked by a
 * hairline that fades into a glowing dot. Decorative parts are hidden from
 * assistive tech; only the label text is announced.
 */
export const PillEyebrow: React.FC<PillEyebrowProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => (
  <div className={[styles.wrapper, className].filter(Boolean).join(' ')} {...props}>
    <span className={styles.tail} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.line} />
    </span>

    <span className={styles.pill}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.text}>{children}</span>
    </span>

    <span className={`${styles.tail} ${styles.tailRight}`} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.dot} />
    </span>
  </div>
);
