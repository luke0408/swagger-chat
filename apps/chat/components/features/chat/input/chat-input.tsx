'use client';

import { TextArea } from '@/components/common/inputs/text-area';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (message: string) => {
    if (!message.trim() || disabled) return;
    onSendMessage(message);
    setInputMessage('');
  };

  return (
    <TextArea
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      onSubmit={handleSubmit}
      placeholder="Type your message..."
      rows={5}
      disabled={disabled}
    />
  );
};
