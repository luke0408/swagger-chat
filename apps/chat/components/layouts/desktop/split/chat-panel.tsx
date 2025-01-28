'use client';
import { ChatContent } from '@/components/chat/chat-content';
import { cn } from '@/lib';

export const ChatPanel = () => {
  return (
    <div className={cn('h-full p-4')}>
      <ChatContent />
    </div>
  );
};
