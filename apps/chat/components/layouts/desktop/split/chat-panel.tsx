'use client';

import { ApiKeyInput } from '@/components/input/api-key-input';
import { ChatContent } from '@/components/chat/chat-content';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { cn } from '@/lib';

export const ChatPanel = () => {
  const { encryptedApiKey } = useApiKeyStore();

  return (
    <div className={cn('h-full p-4')}>{encryptedApiKey ? <ChatContent /> : <ApiKeyInput />}</div>
  );
};
