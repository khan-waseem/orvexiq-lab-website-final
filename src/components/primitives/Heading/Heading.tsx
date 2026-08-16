import React, { HTMLAttributes } from 'react';
import styles from './Heading.module.css';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingAlign = 'left' | 'center' | 'right';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  align?: HeadingAlign;
  children: React.ReactNode;
  className?: string;
  as?: HeadingLevel;
}

/**
 * Heading Primitive Component
 *
 * Supports semantic heading levels (h1-h6) and 100% token typography metrics.
 * Note: Single-H1 enforcement per page is the responsibility of page/template architecture.
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  align = 'left',
  children,
  className = '',
  as,
  ...props
}) => {
  const Component = as || level;

  const alignClassMap: Record<HeadingAlign, string> = {
    left: styles.alignLeft,
    center: styles.alignCenter,
    right: styles.alignRight,
  };

  const combinedClassName = [
    styles.heading,
    styles[level],
    alignClassMap[align],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};
