'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib';
import { ButtonHTMLAttributes } from 'react';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export function BackButton({ className, size = 'md', ...props }: BackButtonProps) {
  return (
    <button
      className={cn('rounded-lg p-2 hover:bg-gray-100', className)}
      aria-label="Go back"
      {...props}
    >
      <ArrowLeftIcon className={cn(sizeClasses[size])} />
    </button>
  );
}
