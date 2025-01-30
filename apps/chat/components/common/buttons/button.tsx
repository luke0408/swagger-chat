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
        'w-full rounded-lg bg-black py-4 text-white',
        'transition-opacity hover:opacity-90 active:opacity-80',
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
