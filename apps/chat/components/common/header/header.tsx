'use client';

import { cn } from '@/lib/index';
import { BackButton } from '../buttons/back-button';

interface HeaderProps {
  isDefault?: boolean;
  title?: string;
  onBackClick?: () => void;
}

export function Header({ isDefault = true, title = 'SWAGGER CHAT', onBackClick }: HeaderProps) {
  return (
    <header className={cn('fixed top-0 z-20 h-[48px] w-full border-b border-gray-200 bg-white')}>
      <div className={cn('mx-auto flex h-full max-w-7xl items-center justify-between px-4')}>
        <div className={cn('flex items-center gap-2')}>
          {!isDefault && <BackButton onClick={onBackClick} />}
          <h1 className={cn('text-lg font-semibold')}>{title}</h1>
        </div>
      </div>
    </header>
  );
}
