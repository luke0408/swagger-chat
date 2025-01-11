'use client';

import { ApiKeyInput } from '@/components/input/api-key-input';
import { ChatContent } from '@/components/chat/chat-content';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { cn } from '@/lib';

export const ChatPanel = () => {
  const { encryptedApiKey } = useApiKeyStore();

  return (
    <div className={cn('h-[calc(100vh-48px)] pt-[48px] px-4')}>
      {encryptedApiKey ? <ChatContent /> : <ApiKeyInput />}
    </div>
  );
};
