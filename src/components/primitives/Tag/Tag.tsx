import React, { HTMLAttributes } from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'category' | 'status-approved' | 'status-review' | 'status-blocked';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Tag Primitive Component
 *
 * Supported Figma Variants:
 * - category: Category pill tag (e.g. FINTECH)
 * - status-approved: Green badge tag (Approved)
 * - status-review: Purple badge tag (In review)
 * - status-blocked: Red badge tag (Blocked)
 */
export const Tag: React.FC<TagProps> = ({
  variant = 'category',
  children,
  className = '',
  ...props
}) => {
  const variantClassMap: Record<TagVariant, string> = {
    category: styles.category,
    'status-approved': styles.statusApproved,
    'status-review': styles.statusReview,
    'status-blocked': styles.statusBlocked,
  };

  const combinedClassName = [
    styles.tag,
    variantClassMap[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};
