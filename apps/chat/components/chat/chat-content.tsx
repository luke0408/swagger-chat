import { ChatService } from "@/lib/chat/service";
import { useChatStore } from "@/store/useChatStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useSwaggerStore } from "@/store/useSwaggerStore";
import { useEffect, useRef, useState } from "react";
import { MessageHistory } from "./message-history";
import { TextArea } from "../ui";

export const ChatContent = () => {
  const { addMessage } = useChatStore();
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