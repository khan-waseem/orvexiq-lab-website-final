import React, { HTMLAttributes } from 'react';
import styles from './Eyebrow.module.css';

export type EyebrowAlignment = 'left' | 'center';

export interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: EyebrowAlignment;
  className?: string;
}

/**
 * Eyebrow Primitive Component
 *
 * Visual spec from Figma:
 * - Dash rule (30px width, 1px height, brand secondary 400 purple)
 * - Uppercase tracking (1.68px spacing)
 * - Alignment: left (dash left of text) or center (dashes flanking text)
 */
export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  align = 'left',
  className = '',
  ...props
}) => {
  const combinedClassName = [
    styles.eyebrow,
    styles[align],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} {...props}>
      <span className={styles.dash} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
      {align === 'center' && <span className={styles.dash} aria-hidden="true" />}
    </div>
  );
};
