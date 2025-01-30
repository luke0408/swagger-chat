import { create } from 'zustand';
import {
  validateSwaggerFile,
  validateSwaggerDocument,
  parseFileContent,
} from '@/lib/utils/validation';

type SwaggerType = 'url' | 'file';

interface SwaggerState {
  type: SwaggerType;
  url: string;
  file: File | null;
  isLoading: boolean;
  error: string | null;
}

interface SwaggerActions {
  setType: (type: SwaggerType) => void;
  setUrl: (url: string) => void;
  setFile: (file: File | null) => void;
  reset: () => void;
  submitSwagger: () => Promise<boolean>;
}

export const useSwaggerStore = create<SwaggerState & SwaggerActions>((set, get) => ({
  // State
  type: 'url',
  url: 'https://petstore.swagger.io/v2/swagger.json',
  file: null,
  isLoading: false,
  error: null,

  // Actions
  setType: (type) => set({ type }),
  setUrl: (url) => {
    set({ url, error: null });
  },
  setFile: (file) => {
    if (!file) {
      set({ file: null, error: null });
      return;
    }

    const validation = validateSwaggerFile(file);
    if (!validation.success) {
      set({ error: validation.error });
      return;
    }

    set({ file, error: null });
  },
  reset: () =>
    set({
      url: '',
      file: null,
      error: null,
      isLoading: false,
    }),
  submitSwagger: async () => {
    const { type, url, file } = get();
    set({ isLoading: true, error: null });

    if (type === 'url') {
      const response = await fetch(url);
      const data = await response.json();

      if (!validateSwaggerDocument(data)) {
        set({ error: 'Invalid Swagger/OpenAPI document' });
        set({ isLoading: false });
        return false;
      }

      set({ isLoading: false });
      return true;
    }

    if (file) {
      const content = await file.text();
      const data = parseFileContent(content, file.name);

      if (!validateSwaggerDocument(data)) {
        set({ error: 'Invalid Swagger/OpenAPI document' });
        set({ isLoading: false });
        return false;
      }

      set({ isLoading: false });
      return true;
    }

    set({ isLoading: false });
    return false;
  },
}));
