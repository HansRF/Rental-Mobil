import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-accent text-white hover:opacity-90 transition-all active:scale-95 px-4 py-2 text-sm font-medium rounded-lg',
      secondary: 'bg-brand-card text-text-primary hover:bg-slate-800 transition-all border border-brand-border',
      outline: 'border border-brand-border bg-transparent hover:bg-white/5 text-text-primary transition-all active:scale-95',
      danger: 'bg-red-500 text-white hover:bg-red-600 transition-all active:scale-95',
      ghost: 'bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all active:scale-95',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg',
      md: 'px-4 py-2 text-sm font-medium rounded-xl',
      lg: 'px-6 py-3 text-base font-semibold rounded-2xl',
      icon: 'p-2 rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
