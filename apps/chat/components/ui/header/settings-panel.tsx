'use client';

import { cn } from '@/lib';
import { LanguageSelector } from '../language-selector';

interface SettingsPanelProps {
  isOpen: boolean;
  onBackdropClick: () => void;
}

export const SettingsPanel = ({
  isOpen,
  onBackdropClick,
}: SettingsPanelProps) => {
  return (
    <>
      {/* Settings Panel */}
      <div
        className={cn(
          'fixed top-[48px] left-0 right-0 z-20 bg-white border-b shadow-sm transition-all duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className={cn('max-w-2xl mx-auto p-4')}>
          <div className={cn('flex justify-center')}>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={cn('fixed inset-0 bg-black/20 z-10')}
          onClick={onBackdropClick}
        />
      )}
    </>
  );
};
