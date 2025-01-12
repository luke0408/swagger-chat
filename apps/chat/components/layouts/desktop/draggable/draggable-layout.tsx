'use client';

import { useWindowStore } from '@/store/useWindowStore';
import { DraggableWindow } from '@/components/ui/draggable-window';
import { ApiKeyInput } from '@/components/input/api-key-input';
import { ChatContent } from '@/components/chat/chat-content';
import { SwaggerWrapper } from '@/components/swagger-ui/swagger-wrapper';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { HelpButton } from '@/components/ui/help/help-button';
import { cn } from '@/lib';

export const DraggableLayout = () => {
  const { swaggerWindow, chatWindow, layoutMode, setSwaggerWindow, setChatWindow } =
    useWindowStore();
  const { apiKey } = useApiKeyStore();

  if (layoutMode === 'split') {
    return null;
  }

  return (
    <div className={cn('relative mt-[48px] h-[calc(100vh-48px)]')}>
      <DraggableWindow
        position={swaggerWindow}
        onPositionChange={setSwaggerWindow}
        title="Swagger Documentation"
      >
        <SwaggerWrapper />
      </DraggableWindow>

      <DraggableWindow position={chatWindow} onPositionChange={setChatWindow} title="Chat">
        {apiKey ? <ChatContent /> : <ApiKeyInput />}
      </DraggableWindow>

      <HelpButton helpKey="layout" buttonClassName="z-50" />
    </div>
  );
};
