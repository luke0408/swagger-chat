'use client';

import { cn } from '@/lib';
import { useTranslation } from 'react-i18next';
import { StepTranslationKey } from './steps';

interface StepItemProps {
  id: number;
  translationKey: StepTranslationKey;
}

export function StepItem({ id, translationKey }: StepItemProps) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-start gap-3')}>
      <span className={cn('font-bold text-gray-700')}>{id}.</span>
      <span>{t(translationKey)}</span>
    </div>
  );
}
