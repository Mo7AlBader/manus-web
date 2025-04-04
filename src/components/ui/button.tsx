import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-[0_0_15px_rgba(110,0,255,0.5)] hover:shadow-[0_0_20px_rgba(110,0,255,0.7)]',
    secondary: 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-[0_0_15px_rgba(0,209,255,0.5)] hover:shadow-[0_0_20px_rgba(0,209,255,0.7)]',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-950 shadow-[0_0_10px_rgba(110,0,255,0.3)] hover:shadow-[0_0_15px_rgba(110,0,255,0.5)]',
    ghost: 'text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-950 hover:text-purple-700',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };
  
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
