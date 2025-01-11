'use client';

import { cn } from '@/lib';
import { LanguageSelector } from './language-selector';

interface SettingsPanelProps {
  isOpen: boolean;
  onBackdropClick: () => void;
}

export const SettingsPanel = ({ isOpen, onBackdropClick }: SettingsPanelProps) => {
  return (
    <>
      {/* Settings Panel */}
      <div
        className={cn(
          'fixed left-0 right-0 top-[48px] z-20 border-b bg-white shadow-sm transition-all duration-200',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className={cn('mx-auto max-w-2xl p-4')}>
          <div className={cn('flex justify-center')}>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className={cn('fixed inset-0 z-10 bg-black/20')} onClick={onBackdropClick} />}
    </>
  );
};
