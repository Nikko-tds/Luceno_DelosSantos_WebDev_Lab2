'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'ghost' | 'secondary';
}

export default function Button({
  children,
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all';
  const variants = {
    default: 'bg-black text-white hover:bg-green',
    secondary: 'bg-offwhite text-black hover:bg-white hover:border hover:border-green hover:text-green',
    ghost: 'bg-offwhite text-black ',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
