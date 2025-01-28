'use client';

import { cn } from '@/lib';
import { useTranslation } from 'react-i18next';

export function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className={cn('mt-8 text-center text-sm text-gray-500')}>
      Swagger Chat
      <br />
      API Documentation Assistant
    </footer>
  );
}
