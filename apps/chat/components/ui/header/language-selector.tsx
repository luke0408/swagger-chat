'use client';

import { cn } from '@/lib/index';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store/useLanguageStore';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
];

export function LanguageSelector() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    
    const currentLocale = pathname.split('/')[1];
    if (currentLocale !== languageCode) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${languageCode}`);
      router.replace(newPath, { scroll: false });
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {t('header.language')}
      </label>
      <div className="flex gap-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              language.code === currentLanguage
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            )}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}
