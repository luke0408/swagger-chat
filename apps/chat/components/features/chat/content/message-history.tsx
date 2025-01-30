'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { cn } from '@/lib';
import { parseMarkdown } from '@/lib/markdown';
import { LoadingDots } from '@/components/common/feedback/loading-dots';

interface Props {
  isLoading?: boolean;
}

export function MessageHistory({ isLoading }: Props) {
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div></div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col space-y-2 text-sm',
              message.role === 'assistant' && 'items-start',
              message.role === 'user' && 'items-end'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] whitespace-pre-wrap break-words rounded-lg px-4 py-2',
                message.role === 'assistant' && 'bg-gray-50',
                message.role === 'user' && 'bg-black text-white'
              )}
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(message.content),
              }}
            />
          </div>
        ))
      )}
      {isLoading ? (
        <div className={cn('flex h-full items-center justify-start')}>
          <LoadingDots />
        </div>
      ) : (
        <div ref={messagesEndRef} />
      )}
    </div>
  );
}
