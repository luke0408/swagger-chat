'use client';

import { cn } from '@/lib/index';
import { useState } from 'react';

interface SwitchProps {
  leftLabel?: string;
  rightLabel?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}

export function Switch({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: SwitchProps) {

  const handleToggle = () => {
    onChange?.(!(value ?? false));  // 부모에게 상태 변경 위임
  };
  return (
    <div className={cn('flex items-center space-x-4', className)}>
      {leftLabel && (
        <span
          className={cn(
            'cursor-pointer transition-all',
            !value ? 'font-bold text-black' : 'font-normal text-gray-500'
          )}
          onClick={handleToggle}  // 무조건 토글 가능
        >
          {leftLabel}
        </span>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'relative h-8 w-14 rounded-full bg-black transition-colors duration-300'
        )}
      >
        <div
          className={cn(
            "absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform duration-300",
            value && "translate-x-6"
          )}
        />
      </button>

      {rightLabel && (
        <span
          className={cn(
            'cursor-pointer transition-all',
            value ? 'font-bold text-black' : 'font-normal text-gray-500'
          )}
          onClick={handleToggle}  // 무조건 토글 가능
        >
          {rightLabel}
        </span>
      )}
    </div>
  );
}

Switch.displayName = 'Switch';