'use client';

import { cn } from '@/lib';
import { useTranslation } from 'react-i18next';

export function LandingHeader() {
  const { t } = useTranslation();

  return (
    <header className={cn('mb-8 space-y-6 text-center')}>
      <h1
        className={cn(
          'text-2xl font-bold md:text-4xl',
          'bg-gradient-to-r from-gray-800 to-gray-600',
          'bg-clip-text text-transparent',
          'leading-tight'
        )}
      >
        Don't read Swagger anymore
        <br />
        Just Chat
      </h1>
      <p className={cn('mx-auto max-w-md text-lg text-gray-600')}>
        Experience a new way to explore and understand your API documentation through natural
        conversations
      </p>
    </header>
  );
}
