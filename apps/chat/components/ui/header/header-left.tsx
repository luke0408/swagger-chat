'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib';

interface HeaderLeftProps {
  title: string;
  isDefault?: boolean;
  onBackClick?: () => void;
}

export const HeaderLeft = ({ title, isDefault = true, onBackClick }: HeaderLeftProps) => {
  return (
    <div className={cn('flex items-center gap-2')}>
      {/* Go Back Button */}
      {!isDefault && (
        <button
          className={cn('rounded-lg p-2 hover:bg-gray-100')}
          aria-label="Go back"
          onClick={onBackClick}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
      )}

      {/* Title */}
      <h1 className={cn('text-lg font-semibold')}>{title}</h1>
    </div>
  );
};
