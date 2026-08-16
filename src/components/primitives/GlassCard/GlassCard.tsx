import React, { HTMLAttributes } from 'react';
import styles from './GlassCard.module.css';

export type GlassCardVariant = 'card' | 'service' | 'testimonial' | 'cta' | 'stage';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

/**
 * GlassCard Primitive Component
 *
 * Implements the core glassmorphism container treatments from Figma:
 * - card: Standard glass card (Selected Work grid)
 * - service: 352px height service glass container
 * - testimonial: 18px backdrop blur quote card
 * - cta: Gradient background CTA block
 * - stage: 11px backdrop blur system visualizer stage card
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'card',
  children,
  className = '',
  as = 'div',
  ...props
}) => {
  const Component = as;

  const combinedClassName = [
    styles.glassCard,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};
