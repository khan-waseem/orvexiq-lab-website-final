import React, { HTMLAttributes } from 'react';
import styles from './Text.module.css';

export type TextSize = 'caption' | 'sm' | 'base' | 'lg' | 'xl';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'brand';
export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

/**
 * Text Primitive Component
 *
 * Handles body copy, paragraph lead text, descriptions, and metadata labels
 * with 100% token adherence for size, weight, color, and line-height.
 */
export const Text: React.FC<TextProps> = ({
  size = 'base',
  color = 'primary',
  weight = 'regular',
  children,
  className = '',
  as = 'p',
  ...props
}) => {
  const Component = as;

  const sizeClassMap: Record<TextSize, string> = {
    caption: styles.sizeCaption,
    sm: styles.sizeSm,
    base: styles.sizeBase,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
  };

  const colorClassMap: Record<TextColor, string> = {
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    tertiary: styles.colorTertiary,
    brand: styles.colorBrand,
  };

  const weightClassMap: Record<TextWeight, string> = {
    light: styles.weightLight,
    regular: styles.weightRegular,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
    bold: styles.weightBold,
  };

  const combinedClassName = [
    styles.text,
    sizeClassMap[size],
    colorClassMap[color],
    weightClassMap[weight],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};
