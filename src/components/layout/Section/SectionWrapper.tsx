import React, { HTMLAttributes } from 'react';
import styles from './SectionWrapper.module.css';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';
export type SectionTheme = 'canvas' | 'system';

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  padding?: SectionPadding;
  theme?: SectionTheme;
  children: React.ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

/**
 * SectionWrapper Component
 *
 * Reusable semantic `<section>` shell managing section vertical spacing
 * and background color themes (Canvas midnight `#080211` vs System violet `#15102b`).
 */
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  padding = 'md',
  theme = 'canvas',
  children,
  className = '',
  ariaLabelledBy,
  ...props
}) => {
  const paddingClassMap: Record<SectionPadding, string> = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };

  const themeClassMap: Record<SectionTheme, string> = {
    canvas: styles.canvasBg,
    system: styles.systemBg,
  };

  const combinedClassName = [
    styles.section,
    paddingClassMap[padding],
    themeClassMap[theme],
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      id={id}
      className={combinedClassName}
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {children}
    </section>
  );
};
