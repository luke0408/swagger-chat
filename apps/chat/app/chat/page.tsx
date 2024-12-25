'use client';

import dynamic from 'next/dynamic';

const WindowContainer = dynamic(
  () => import('@/components/chat/window-container'),
  { ssr: false }
);

export default function ChatPage() {
  return <WindowContainer />;
}