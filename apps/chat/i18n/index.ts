'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { Translation } from './types';

// English translations
import enCommon from './locales/en/common.json';
import enHeader from './locales/en/header.json';
import enModal from './locales/en/modal.json';
import enLanding from './locales/en/landing.json';

// Korean translations
import koCommon from './locales/ko/common.json';
import koHeader from './locales/ko/header.json';
import koModal from './locales/ko/modal.json';
import koLanding from './locales/ko/landing.json';

// Japanese translations
import jaCommon from './locales/ja/common.json';
import jaHeader from './locales/ja/header.json';
import jaModal from './locales/ja/modal.json';
import jaLanding from './locales/ja/landing.json';

// Chinese translations
import zhCommon from './locales/zh/common.json';
import zhHeader from './locales/zh/header.json';
import zhModal from './locales/zh/modal.json';
import zhLanding from './locales/zh/landing.json';

const resources = {
  en: {
    translation: {
      common: enCommon,
      header: enHeader,
      modal: enModal,
      landing: enLanding,
    } as Translation,
  },
  ko: {
    translation: {
      common: koCommon,
      header: koHeader,
      modal: koModal,
      landing: koLanding,
    } as Translation,
  },
  ja: {
    translation: {
      common: jaCommon,
      header: jaHeader,
      modal: jaModal,
      landing: jaLanding,
    } as Translation,
  },
  zh: {
    translation: {
      common: zhCommon,
      header: zhHeader,
      modal: zhModal,
      landing: zhLanding,
    } as Translation,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
