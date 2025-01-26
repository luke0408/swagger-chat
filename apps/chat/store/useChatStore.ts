import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { type ChatState } from '@/types/chat';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: nanoid(),
          ...message,
          timestamp: Date.now(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
