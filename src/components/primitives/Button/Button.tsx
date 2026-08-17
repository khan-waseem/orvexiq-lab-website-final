import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'nav' | 'ctaPrimary' | 'email';

type CommonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

type AsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = AsButtonProps | AsLinkProps;

/**
 * Button Primitive Component
 *
 * Supports both:
 * - Action behavior: renders a semantic `<button>` tag when `href` is undefined.
 * - Navigation behavior: renders a Next.js `<Link>` (anchor) when `href` is provided.
 * Does NOT nest interactive elements (`<Link><button>...</button></Link>`).
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  href,
  ...props
}) => {
  const combinedClassName = [
    styles.button,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    // Exclude button-specific attributes if any exist
    const { ...linkProps } = props as Omit<AsLinkProps, 'href'>;
    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { disabled, type = 'button', ...buttonProps } = props as AsButtonProps;

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
