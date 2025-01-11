'use client';

import { useEffect } from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import { MobileLayout } from './mobile/mobile-layout';
import { DraggableLayout } from './desktop/draggable/draggable-layout';
import { SplitLayout } from './desktop/split/split-layout';
import { Header } from '@/components/ui/header/header';
import { useRouter, useParams } from 'next/navigation';

export default function WindowContainer() {
  const { isMobile, layoutMode, setIsMobile } = useWindowStore();
  const router = useRouter();
  const { locale } = useParams();

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
    <>
      <Header
        isDefault={false}
        onBackClick={() => {
          router.push(`/${locale}`);
        }}
      />
      <div className="mt-[48px] relative w-full h-[calc(100vh-48px)]">
        {isMobile ? (
          <MobileLayout />
        ) : layoutMode === 'draggable' ? (
          <DraggableLayout />
        ) : (
          <SplitLayout />
        )}
      </div>
    </>
  );
}
