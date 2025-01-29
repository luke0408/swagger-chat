'use client';

import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { Header } from '@/components/common/header';
import { MobileSplitLayout } from './mobile/mobile-split-layout';
import { DesktopSplitLayout } from './desktop/desktop-split-layout';

export default function WorkspaceLayout() {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col">
      <Header
        isDefault={false}
        onBackClick={() => {
          router.push(`/`);
        }}
      />
      <div className="relative mt-[48px] h-[calc(100vh-48px)] w-full">
        {isMobile ? <MobileSplitLayout /> : <DesktopSplitLayout />}
      </div>
    </div>
  );
}
