'use client';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib';
import { useWindowStore } from '@/store/useWindowStore';
import { LayoutToggle } from './layout-toggle';

interface HeaderRightProps {
  isDefault?: boolean;
  isSettingsOpen: boolean;
  onSettingsClick: () => void;
}

export const HeaderRight = ({
  isDefault = true,
  isSettingsOpen,
  onSettingsClick,
}: HeaderRightProps) => {
  const { isMobile } = useWindowStore();

  return (
    <div className={cn('flex items-center gap-2')}>
      {/* Layout Toggle */}
      {!isMobile && !isDefault && <LayoutToggle />}

      {/* Settings Button */}
      <button
        className={cn(
          'rounded-lg p-2 transition-transform hover:bg-gray-100',
          isSettingsOpen && 'rotate-180'
        )}
        aria-label="Settings"
        onClick={onSettingsClick}
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
