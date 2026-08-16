import React, { HTMLAttributes } from 'react';
import styles from './Container.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'main' | 'header' | 'footer' | 'section';
}

/**
 * PageContainer Component
 *
 * Canonical responsive layout container controlling max width (1440px)
 * and responsive page margins (96px desktop, 48px tablet, 24px mobile).
 */
export const PageContainer: React.FC<ContainerProps> = ({
  children,
  className = '',
  as = 'div',
  ...props
}) => {
  const Component = as;

  const combinedClassName = [styles.container, className].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};
