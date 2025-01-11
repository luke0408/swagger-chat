'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib';

interface HeaderLeftProps {
  title: string;
  isDefault?: boolean;
  onBackClick?: () => void;
}

export const HeaderLeft = ({
  title,
  isDefault = true,
  onBackClick,
}: HeaderLeftProps) => {
  return (
    <div className={cn('flex items-center gap-2')}>
      {/* Go Back Button */}
      {!isDefault && (
        <button
          className={cn('p-2 hover:bg-gray-100 rounded-lg')}
          aria-label="Go back"
          onClick={onBackClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      )}

      {/* Title */}
      <h1 className={cn('text-lg font-semibold')}>{title}</h1>
    </div>
  );
};
