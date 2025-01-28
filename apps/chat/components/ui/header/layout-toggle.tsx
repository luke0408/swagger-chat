'use client';

import { ViewColumnsIcon, WindowIcon } from '@heroicons/react/24/outline';
import { useWindowStore } from '@/store/useWindowStore';
import { cn } from '@/lib';

export const LayoutToggle = () => {
  const { layoutMode, setLayoutMode } = useWindowStore();

  const toggleLayout = () => {
    setLayoutMode(layoutMode === 'draggable' ? 'split' : 'draggable');
  };

  return (
    <button
      className={cn('rounded-lg p-2 hover:bg-gray-100')}
      aria-label="Toggle layout"
      onClick={toggleLayout}
      title={layoutMode === 'draggable' ? 'Split View' : 'Draggable View'}
    >
      {layoutMode === 'draggable' ? (
        <WindowIcon className={cn('h-5 w-5')} />
      ) : (
        <ViewColumnsIcon className={cn('h-5 w-5')} />
      )}
    </button>
  );
};
