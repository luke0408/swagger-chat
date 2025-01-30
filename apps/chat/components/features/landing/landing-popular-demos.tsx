'use client';

import React, { useEffect, useState } from 'react';
import { MobileSplitLayout } from '@/components/features/workspace/mobile/mobile-split-layout';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { ContentSkeleton } from '@/components/common/feedback/content-skeleton';
import { DesktopSplitLayout } from '../workspace/desktop/desktop-split-layout';
import { DemoContainer } from './demo/container';
import { DemoType } from './demo/types';
import { PETSTORE_DEMO } from './demo/icons/petstore';
import { useChatStore } from '@/store/useChatStore';

export function LandingPopularDemos() {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>(PETSTORE_DEMO);
  const { setUrl, setType } = useSwaggerStore();
  const { clearMessages } = useChatStore();
  const isMobile = useIsMobile();

  const handleDemoSelect = (demo: DemoType) => {
    setSelectedDemo(demo);
    if (demo.url) {
      setType('url');
      setUrl(demo.url);
    }
  };

  useEffect(() => {
    clearMessages();
  }, []);

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Demo Icons Section */}
      <div className="space-y-4">
        <DemoContainer onDemoSelect={handleDemoSelect} selectedDemo={selectedDemo} />
      </div>

      {/* Split Layout Section */}
      <div className={`${isMobile ? 'h-[800px]' : 'h-[600px]'} rounded-xl border bg-white`}>
        {selectedDemo?.url ? (
          isMobile ? (
            <MobileSplitLayout />
          ) : (
            <DesktopSplitLayout />
          )
        ) : (
          <div className="h-full p-6">
            <ContentSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
