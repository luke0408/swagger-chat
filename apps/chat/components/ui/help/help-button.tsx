'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cn } from '@/lib';
import { HelpOverlay } from './help-overlay';
import { useTranslation } from 'react-i18next';
import type { Translation } from '@/i18n/types';

type HelpSections = keyof Translation['landing']['main']['help'];

interface HelpButtonProps {
  helpKey: HelpSections;
  buttonClassName?: string;
}

export const HelpButton = ({ helpKey, buttonClassName }: HelpButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const getHelpContent = () => {
    if (helpKey === 'title') return [];
    return t(`landing.main.help.${helpKey}.content`, { returnObjects: true }) as string[];
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-4 right-4 text-gray-500 transition-colors hover:text-gray-700',
          buttonClassName
        )}
        title={t('landing.main.help.title')}
      >
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </button>

      <HelpOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          helpKey === 'title'
            ? t('landing.main.help.title')
            : t(`landing.main.help.${helpKey}.title`)
        }
      >
        <div className="space-y-2">
          {getHelpContent().map((line, index) => (
            <p key={index}>• {line}</p>
          ))}
        </div>
      </HelpOverlay>
    </>
  );
};
