import { create } from 'zustand';

interface SettingsState {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

export const useApiKeyStore = create<SettingsState>()((set) => ({
  apiKey: '',
  setApiKey: (key) => set({ apiKey: key }),
  clearApiKey: () => set({ apiKey: '' }),
}));
