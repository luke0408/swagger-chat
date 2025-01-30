'use client';

import React from 'react';
import { cn } from '@/lib/index';

export function Button({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'text-md rounded-lg bg-black px-4 py-4 font-semibold text-white',
        'transition-all duration-200',
        'hover:opacity-90',
        'active:scale-[0.99]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'cursor-pointer',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
