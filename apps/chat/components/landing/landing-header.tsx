'use client';

import { cn } from "@/lib";
import { useTranslation } from "react-i18next";

export function LandingHeader() {
  const { t } = useTranslation();

  return (
    <header className={cn('text-center space-y-6 mb-8')}>
      <h1
        className={cn(
          'text-2xl md:text-4xl font-bold',
          'bg-gradient-to-r from-gray-800 to-gray-600',
          'bg-clip-text text-transparent',
          'leading-tight'
        )}
      >
        {t('landing.header.title.line1')}
        <br />
        {t('landing.header.title.line2')}
      </h1>
      <p className={cn('text-lg text-gray-600 max-w-md mx-auto')}>
        {t('landing.header.description')}
      </p>
    </header>
  );
}
