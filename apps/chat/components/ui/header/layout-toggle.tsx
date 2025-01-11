'use client';

import { ViewColumnsIcon, WindowIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useWindowStore } from '@/store/useWindowStore';
import { cn } from '@/lib';

export const LayoutToggle = () => {
  const { t } = useTranslation();
  const { layoutMode, setLayoutMode } = useWindowStore();

  const toggleLayout = () => {
    setLayoutMode(layoutMode === 'draggable' ? 'split' : 'draggable');
  };

  return (
    <button
      className={cn('p-2 hover:bg-gray-100 rounded-lg')}
      aria-label="Toggle layout"
      onClick={toggleLayout}
      title={layoutMode === 'draggable' ? t('header.layout.split') : t('header.layout.draggable')}
    >
      {layoutMode === 'draggable' ? (
        <WindowIcon className={cn('w-5 h-5')} />
      ) : (
        <ViewColumnsIcon className={cn('w-5 h-5')} />
      )}
    </button>
  );
};
