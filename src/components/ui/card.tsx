import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outline';
  hover?: boolean;
}

export function Card({
  children,
  className,
  variant = 'default',
  hover = false,
}: CardProps) {
  const baseStyles = 'rounded-lg p-6';
  
  const variantStyles = {
    default: 'bg-gray-900 border border-gray-800',
    glass: 'backdrop-blur-md bg-gray-900/60 border border-gray-800/50',
    outline: 'border border-purple-600/50 bg-transparent',
  };
  
  const hoverStyles = hover 
    ? 'transition-all duration-300 hover:shadow-[0_0_20px_rgba(110,0,255,0.3)] hover:-translate-y-1' 
    : '';
  
  return (
    <div className={cn(
      baseStyles,
      variantStyles[variant],
      hoverStyles,
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h3 className={cn('text-xl font-bold text-white', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <p className={cn('text-gray-400 mt-1', className)}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn('mt-4 flex items-center', className)}>
      {children}
    </div>
  );
}
