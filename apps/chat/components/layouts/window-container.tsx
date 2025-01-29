'use client';

import { SplitLayout } from './desktop/split/split-layout';
import { Header } from '@/components/ui/header/header';
import { useRouter } from 'next/navigation';
import { MobileSplitLayout } from './desktop/split/mobile-split-layout';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function WindowContainer() {
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
        {isMobile ? <MobileSplitLayout /> : <SplitLayout />}
      </div>
    </div>
  );
}
