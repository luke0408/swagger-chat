import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/index';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSubmit?: (value: string) => void;
  error?: string;
  className?: string;
  wrapperClassName?: string;
  autoResize?: boolean;
  label?: string;
  maxRows?: number;
}

export function TextArea({
  onSubmit,
  error,
  className,
  wrapperClassName,
  autoResize = true,
  rows = 1,
  maxRows = 5,
  placeholder,
  value,
  onChange,
  label,
  ...props
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(
        textareaRef.current.scrollHeight,
        textareaRef.current.rows * 24 * maxRows
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, maxRows]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value && typeof value === 'string' && value.trim()) {
        onSubmit?.(value);
      }
    }
  };

  return (
    <div className={cn('w-full space-y-2', wrapperClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          rows={rows}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-3 text-base transition-colors resize-none overflow-hidden',
            'rounded-t-lg border-0',
            'bg-white ring-1 ring-inset ring-gray-300',
            'focus:outline-none focus:ring-1 focus:ring-gray-500',
            'placeholder:text-gray-400',
            error && 'ring-red-500 focus:ring-red-500',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
            className
          )}
          style={{
            minHeight: `${rows * 24}px`,
            maxHeight: `${maxRows * 24}px`
          }}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

TextArea.displayName = 'TextArea';