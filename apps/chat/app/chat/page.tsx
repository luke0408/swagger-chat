'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWindowStore } from '@/store/useWindowStore';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { DraggableWindow } from '@/components/ui/draggable-window';
import { cn } from '@/lib/index';
import dynamic from 'next/dynamic';
import { MessageHistory } from '@/components/chat/message-history';
import { useChatStore } from '@/store/useChatStore';
import { TextArea } from '@/components/ui/text-area';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <div>Loading Swagger UI...</div>
});

const SwaggerWrapper = () => {
  const { url, file } = useSwaggerStore();

  const displayUrl = url || (file ? URL.createObjectURL(file) : null);

  if (!displayUrl) return null;

  return (
    <div className="swagger-wrapper p-4 bg-white overflow-auto h-full">
      <SwaggerUI url={displayUrl} />
    </div>
  );
};

const ApiKeyInput = () => {
  const { apiKey, setApiKey } = useSettingsStore();
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!inputKey.startsWith('sk-')) {
      setError('API Key must start with sk-');
      return;
    }

    setApiKey(inputKey);
    setError('');
  };

  return (
    <div className={cn('flex flex-col space-y-4 p-4')}>
      <Input
        type="password"
        label="OpenAI API Key"
        placeholder="sk-..."
        value={inputKey}
        onChange={(e) => setInputKey(e.target.value)}
        error={error}
      />
      <Button onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

import { ChatService } from '@/lib/chat/service';

const ChatContent = () => {
  const { messages, addMessage, clearMessages } = useChatStore();
  const { apiKey } = useSettingsStore();
  const { url } = useSwaggerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const chatServiceRef = useRef<ChatService | null>(null);

  useEffect(() => {
    if (apiKey && url) {
      const locale = typeof window !== 'undefined' ? window.navigator.language : 'en';
      chatServiceRef.current = new ChatService(apiKey, url, locale);
    }
  }, [apiKey, url]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatServiceRef.current) return;

    const userMessage = inputMessage.trim();

    addMessage({
      role: 'user',
      content: userMessage
    });

    setIsLoading(true);
    setInputMessage('');

    try {
      const assistantMessageContent = await chatServiceRef.current.sendMessage(userMessage);

      addMessage({
        role: 'assistant',
        content: assistantMessageContent
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: error instanceof Error ? error.message : '메시지 전송 중 오류가 발생했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageHistory isLoading={isLoading} />
      </div>
      <div className="border-t border-gray-300 pt-4">
        <div className="flex space-x-1">
          <TextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onSubmit={handleSendMessage}
            placeholder="Type your message..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

const WindowContainer = () => {
  const { apiKey } = useSettingsStore();
  const {
    swaggerWindow,
    chatWindow,
    isMobile,
    setIsMobile,
  } = useWindowStore();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return (
    <div className="relative w-full h-full">
      <DraggableWindow
        className={isMobile ? 'fixed top-0 left-0 right-0' : 'draggable-header'}
        {...swaggerWindow}
        title="Swagger Documentation"
      >
        <SwaggerWrapper />
      </DraggableWindow>

      <DraggableWindow
        className={isMobile ? 'fixed bottom-0 left-0 right-0' : 'draggable-header'}
        {...chatWindow}
        title="Chat"
      >
        {apiKey ? <ChatContent /> : <ApiKeyInput />}
      </DraggableWindow>
    </div>
  );
};

export default WindowContainer;