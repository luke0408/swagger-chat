'use client';

import { cn } from '@/lib/index';
import { HeaderLeft } from './header-left';
import { HeaderRight } from './header-right';
import { SettingsPanel } from './settings-panel';
import { useSettingsStore } from '@/store/useSettingsStore';

interface HeaderProps {
  isDefault?: boolean;
  title?: string;
  onBackClick?: () => void;
}

export function Header({
  isDefault = true,
  title = 'SWAGGER CHAT',
  onBackClick,
}: HeaderProps) {
  const { isSettingsOpen, setIsSettingsOpen } = useSettingsStore();

  return (
    <>
      <header className={cn('fixed top-0 w-full z-20 h-[48px] bg-white border-b border-gray-200')}>
        <div className={cn('h-full max-w-7xl mx-auto px-4 flex items-center justify-between')}>
          <HeaderLeft title={title} isDefault={isDefault} onBackClick={onBackClick} />
          <HeaderRight
            isDefault={isDefault}
            isSettingsOpen={isSettingsOpen}
            onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
          />
        </div>
      </header>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onBackdropClick={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
