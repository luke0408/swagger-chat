'use client';

import { ApiKeyInput } from '@/components/input/api-key-input';
import { ChatContent } from '@/components/chat/chat-content';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { cn } from '@/lib';

export const ChatPanel = () => {
  const { apiKey } = useApiKeyStore();

  return <div className={cn('h-full p-4')}>{apiKey ? <ChatContent /> : <ApiKeyInput />}</div>;
};
