'use client';

import { useEffect } from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import { SplitLayout } from './desktop/split/split-layout';
import { Header } from '@/components/ui/header/header';
import { useRouter } from 'next/navigation';
import { MobileSplitLayout } from './desktop/split/mobile-split-layout';

export default function WindowContainer() {
  const { isMobile, setIsMobile } = useWindowStore();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

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
