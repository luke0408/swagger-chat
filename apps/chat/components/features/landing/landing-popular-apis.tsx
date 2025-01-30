import React, { useEffect, useState } from 'react';
import { MobileSplitLayout } from '@/components/features/workspace/mobile/mobile-split-layout';
import { APIIcon, APIType, POPULAR_APIS } from './api-icon';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { ContentSkeleton } from '@/components/common/feedback/content-skeleton';
import { DesktopSplitLayout } from '../workspace/desktop/desktop-split-layout';

export function LandingPopularApis() {
  const [selectedAPI, setSelectedAPI] = useState<APIType | null>(POPULAR_APIS[0]);
  const isMobile = useIsMobile();
  const { setUrl } = useSwaggerStore();

  const handleAPISelect = (api: APIType) => {
    setSelectedAPI(api);
  };

  useEffect(() => {
    if (!useSwaggerStore.getState().url) {
      setUrl(POPULAR_APIS[0].url);
    }
  }, [setUrl]);

  return (
    <div className="w-full max-w-4xl">
      {/* Interactive API Selector */}
      <div className="relative h-20 pl-48">
        {POPULAR_APIS.map((api, index) => (
          <APIIcon
            key={api.name}
            api={api}
            isSelected={selectedAPI?.name === api.name}
            index={index}
            onClick={() => handleAPISelect(api)}
            totalIcons={POPULAR_APIS.length}
          />
        ))}
      </div>

      {/* API Info */}
      {selectedAPI && (
        <div className="mb-4 rounded-lg bg-white p-4">
          <h3 className="font-medium">{selectedAPI.name}</h3>
          <p className="text-sm text-gray-600">{selectedAPI.description}</p>
          {/* TODO */}
          <p className={`mt-2 text-sm ${selectedAPI.url ? 'text-pink-600' : 'text-green-600'}`}>
            {selectedAPI.subDescription}
          </p>
        </div>
      )}

      {/* Split Layout Section */}
      <div className={`${isMobile ? 'h-[800px]' : 'h-[600px]'} rounded-xl border bg-white`}>
        {selectedAPI?.url ? (
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
