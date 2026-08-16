import React, { HTMLAttributes } from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  className?: string;
}

/**
 * Divider Primitive Component
 *
 * Implements horizontal section dividers and vertical stat separators from Figma.
 * Semantic HTML: uses <hr> for horizontal orientation and <div> for vertical orientation.
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  ...props
}) => {
  const combinedClassName = [
    styles.divider,
    styles[orientation],
    className,
  ].filter(Boolean).join(' ');

  if (orientation === 'horizontal') {
    return <hr className={combinedClassName} {...props} />;
  }

  return <div role="separator" aria-orientation="vertical" className={combinedClassName} {...props} />;
};
