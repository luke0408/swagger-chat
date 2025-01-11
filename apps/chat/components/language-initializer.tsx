'use client';

import { useLanguageStore } from '@/store/useLanguageStore';
import { useEffect } from 'react';

interface LanguageInitializerProps {
  locale: string;
}

export function LanguageInitializer({ locale }: LanguageInitializerProps) {
  const initializeLanguage = useLanguageStore(state => state.initializeLanguage);

  useEffect(() => {
    if (locale) {
      initializeLanguage(locale);
    }
  }, [locale, initializeLanguage]);

  return null;
}
