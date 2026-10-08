import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonClasses';

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type={type} className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...rest}>
    {icon}
    {children}
  </button>
);

export const ButtonLink = ({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  ...rest
}: StyleProps & LinkProps) => (
  <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...rest}>
    {icon}
    {children}
  </Link>
);

/** Lien externe (WhatsApp, tel:, mailto:) avec l'apparence d'un bouton. */
export const ButtonAnchor = ({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const external = rest.href?.startsWith('http');
  return (
    <a
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
};
