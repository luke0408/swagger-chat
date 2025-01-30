'use client';

import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { MobileSplitLayout } from './mobile/mobile-split-layout';
import { DesktopSplitLayout } from './desktop/desktop-split-layout';
import { Header } from '@/components/common/header/header';
import { Toast, useToast } from '@/components/common/toast/toast';
import { useEffect, useState } from 'react';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useChatStore } from '@/store/useChatStore';

export default function WorkspaceLayout() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const { toast, showToast, hideToast } = useToast();
  const { file, url } = useSwaggerStore();
  const { messages } = useChatStore();
  const [hasShownFirstQuestionToast, setHasShownFirstQuestionToast] = useState<boolean>(false);
  const [hasShownMultipleConversationsToast, setHasShownMultipleConversationsToast] =
    useState<boolean>(false);

  useEffect(() => {
    if (file || url) {
      showToast({
        message: 'You just started conquering your Swagger documentation with the help of AI! ',
        type: 'success',
        duration: 3000,
      });
    }
  }, [file, url]);

  useEffect(() => {
    const userMessageCount = messages.filter((msg) => msg.role === 'user').length;

    if (userMessageCount === 1 && !hasShownFirstQuestionToast) {
      showToast({
        message: 'You saved 3️⃣ DMs from backend developers with just one question!',
        type: 'info',
        duration: 3000,
      });
      setHasShownFirstQuestionToast(true);
    }

    if (userMessageCount >= 5 && !hasShownMultipleConversationsToast) {
      showToast({
        message:
          'While chatting with the AI, You managed to save 23 hairs💈 from the backend developer!',
        type: 'success',
        duration: 3000,
      });
      setHasShownMultipleConversationsToast(true);
    }
  }, [messages]);

  return (
    <div className="flex h-screen flex-col">
      <Header
        isDefault={false}
        onBackClick={() => {
          router.push(`/chat/input`);
        }}
      />
      <div className="relative mt-[48px] h-[calc(100vh-48px)] w-full">
        {isMobile ? <MobileSplitLayout /> : <DesktopSplitLayout />}
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
