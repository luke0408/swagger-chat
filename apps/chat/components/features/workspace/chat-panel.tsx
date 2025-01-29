'use client';
import { cn } from '@/lib';
import { ChatContent } from '../chat/content/chat-content';

export const ChatPanel = () => {
  return (
    <div className={cn('h-full p-4')}>
      <ChatContent />
    </div>
  );
};
