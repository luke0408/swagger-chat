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
        {t('landing.header.title.line1')}
        <br />
        {t('landing.header.title.line2')}
      </h1>
      <p className={cn('mx-auto max-w-md text-lg text-gray-600')}>
        {t('landing.header.description')}
      </p>
    </header>
  );
}
