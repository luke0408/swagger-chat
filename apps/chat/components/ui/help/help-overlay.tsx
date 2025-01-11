'use client';

import { cn } from '@/lib';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const HelpOverlay = ({
  isOpen,
  onClose,
  title,
  children,
}: HelpOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn('fixed inset-0 bg-black/20 z-50')}
        onClick={onClose}
      />
      <div className={cn('fixed bottom-16 right-4 z-50 px-4 py-3 bg-white text-gray-700 text-sm rounded-lg shadow-lg max-w-s')}>
        <div className={cn('flex justify-between items-start mb-2')}>
          <h3 className={cn('font-medium')}>{title}</h3>
          <button
            onClick={onClose}
            className={cn('text-gray-400 hover:text-gray-600')}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
