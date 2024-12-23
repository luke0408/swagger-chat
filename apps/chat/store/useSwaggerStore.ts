import { create } from "zustand"
import { validateSwaggerFile, validateSwaggerUrl } from "@/lib/utils/validation"

interface SwaggerState {
  type: 'url' | 'file'
  url: string
  file: File | null
  isLoading: boolean
  error: string | null
}
interface SwaggerActions {
  setType: (type: 'url' | 'file') => void
  setUrl: (url: string) => void
  setFile: (file: File | null) => void
  reset: () => void
  submitSwagger: () => Promise<boolean>
}

export const useSwaggerStore = create<SwaggerState & SwaggerActions>((set, get) => ({
  type: 'url',
  url: '',
  file: null,
  isLoading: false,
  error: null,

  // actions
  setType: (type) => set({ type }),
  setUrl: (url) => set({ url }),
  setFile: (file) => set({ file }),
  reset: () => set({ type: 'url', url: '', file: null }),
  submitSwagger: async () => {
    const { type, url, file } = get()
    set({ isLoading: true, error: null })

    try {
      if (type === 'url') {
        const error = validateSwaggerUrl(url)
        if (error) {
          set({ error, isLoading: false })
          return false
        }

        const response = await fetch(url);
        if (!response.ok) {
          set({ error: 'Failed to fetch Swagger document', isLoading: false })
          return false;
        }

        const swaggerDoc = await response.json();
        return true;
      } else {
        if (!file) {
          set({ error: 'File is required', isLoading: false })
          return false
        }

        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const swaggerDoc = JSON.parse(e.target?.result as string);
              if (!validateSwaggerFile(swaggerDoc)) {
                throw new Error('Invalid Swagger file');
              }
              set({ error: null, isLoading: false })
              resolve(true);
            } catch (error) {
              set({ error: 'Invalid Swagger file', isLoading: false })
              resolve(false);
            }
          };

          reader.onerror = () => {
            set({ error: 'Failed to read file', isLoading: false })
            resolve(false);
          };

          reader.readAsText(file);
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false
      })
      return false
    }
  }
}))