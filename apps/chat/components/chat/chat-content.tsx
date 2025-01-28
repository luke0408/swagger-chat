'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { MessageHistory } from './message-history';
import { ChatInput } from './chat-input';
import { useThrottle } from '@/hooks/useThrottle';
import { cn } from '@/lib';
import { ChatService } from '@/lib/chat/service';
import { useSwaggerStore } from '@/store/useSwaggerStore';

export const ChatContent = () => {
  const { isLoading, addMessage, setIsLoading } = useChatStore();
  const { url } = useSwaggerStore();
  const chatServiceRef = useRef<ChatService | null>(null);

  useEffect(() => {
    if (url) {
      const locale = typeof window !== 'undefined' ? window.navigator.language : 'en';
      const chatService = new ChatService(locale);
      chatServiceRef.current = chatService;

      (async () => {
        try {
          await chatService.initializeWithUrl(url);
        } catch (error) {
          console.error('Failed to initialize ChatService:', error);
        }
      })();
    }
  }, [url]);

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
          content: 'Sorry, an error occurred while processing your message.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, setIsLoading]
  );

  const throttledHandleSendMessage = useThrottle(handleSendMessage, 1000);

  return (
    <div className="flex h-full flex-col">
      <div className="h-full min-h-[110px] overflow-y-auto pb-4">
        <MessageHistory isLoading={isLoading} />
      </div>
      <div className="mt-auto">
        <ChatInput onSendMessage={throttledHandleSendMessage} />
      </div>
    </div>
  );
};
