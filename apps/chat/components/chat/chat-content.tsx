'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { MessageHistory } from './message-history';
import { ChatInput } from './chat-input';
import { useThrottle } from '@/hooks/useThrottle';
import { cn } from '@/lib';
import { ChatService } from '@/lib/chat/service';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useApiKeyStore } from '@/store/useApiKeyStore';

export const ChatContent = () => {
  const { isLoading, addMessage, setIsLoading } = useChatStore();
  const { url } = useSwaggerStore();
  const { apiKey } = useApiKeyStore();
  const chatServiceRef = useRef<ChatService | null>(null);

  useEffect(() => {
    if (apiKey && url) {
      const locale = typeof window !== 'undefined' ? window.navigator.language : 'en';
      const chatService = new ChatService(apiKey, locale);
      chatServiceRef.current = chatService;

      (async () => {
        try {
          await chatService.initializeWithUrl(url);
        } catch (error) {
          console.error('Failed to initialize ChatService:', error);
        }
      })();
    }
  }, [apiKey, url]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !chatServiceRef.current) return;

      setIsLoading(true);
      addMessage({
        role: 'user',
        content: content.trim(),
      });

      try {
        const assistantMessageContent = await chatServiceRef.current.sendMessage(content.trim());
        addMessage({
          role: 'assistant',
          content: assistantMessageContent,
        });
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage({
          role: 'assistant',
          content: error instanceof Error ? error.message : '메시지 전송 중 오류가 발생했습니다.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, setIsLoading]
  );

  const throttledSendMessage = useThrottle(handleSendMessage, 1000);

  return (
    <div className={cn('relative flex h-full flex-col')}>
      <div className={cn('overflow-y-auto pb-[148px]')}>
        <MessageHistory isLoading={isLoading} />
      </div>
      <div className={cn('absolute bottom-0 h-[148px] w-full border-t bg-white py-4')}>
        <ChatInput onSendMessage={throttledSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
