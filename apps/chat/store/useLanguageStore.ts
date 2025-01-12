import { create } from 'zustand';
import i18n from '@/i18n';

interface LanguageState {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  initializeLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  currentLanguage: '',
  setLanguage: (language) => {
    i18n.changeLanguage(language);
    set({ currentLanguage: language });
  },
  initializeLanguage: (language) => {
    i18n.changeLanguage(language);
    set({ currentLanguage: language });
  },
}));
