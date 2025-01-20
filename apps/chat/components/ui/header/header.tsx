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

export function Header({ isDefault = true, title = 'SWAGGER CHAT', onBackClick }: HeaderProps) {
  const { isSettingsOpen, setIsSettingsOpen } = useSettingsStore();

  return (
    <>
      <header className={cn('fixed top-0 z-20 h-[48px] w-full border-b border-gray-200 bg-white')}>
        <div className={cn('mx-auto flex h-full max-w-7xl items-center justify-between px-4')}>
          <HeaderLeft title={title} isDefault={isDefault} onBackClick={onBackClick} />
          <HeaderRight
            isDefault={isDefault}
            isSettingsOpen={isSettingsOpen}
            onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
          />
        </div>
      </header>

      <SettingsPanel isOpen={isSettingsOpen} onBackdropClick={() => setIsSettingsOpen(false)} />
    </>
  );
}
