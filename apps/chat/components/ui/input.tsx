import React from 'react';
import { cn } from '@/lib/index';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
}

export function Input({
  label,
  error,
  className,
  wrapperClassName,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <div className={cn('w-full space-y-2', wrapperClassName)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        className={cn(
          'w-full px-4 h-12 text-base transition-colors',
          'border-0 rounded-lg',
          'bg-white ring-1 ring-inset ring-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-black',
          'placeholder:text-gray-400',
          error && 'ring-red-500 focus:ring-red-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}