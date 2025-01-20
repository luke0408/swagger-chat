'use client';

import { cn } from '@/lib';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const HelpOverlay = ({ isOpen, onClose, title, children }: HelpOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={cn('fixed inset-0 z-50 bg-black/20')} onClick={onClose} />
      <div
        className={cn(
          'max-w-s fixed bottom-16 right-4 z-50 rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow-lg'
        )}
      >
        <div className={cn('mb-2 flex items-start justify-between')}>
          <h3 className={cn('font-medium')}>{title}</h3>
          <button onClick={onClose} className={cn('text-gray-400 hover:text-gray-600')}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
