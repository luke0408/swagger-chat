'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SplitLayout } from '@/components/layouts/desktop/split/split-layout';
import { useState } from 'react';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { ContentSkeleton } from '@/components/ui/skeleton';
import { MobileSplitLayout } from '../layouts/desktop/split/mobile-split-layout';
import { useWindowStore } from '@/store/useWindowStore';

type API = {
  name: string;
  description: string;
  url: string;
};

const popularAPIs = [
  {
    name: 'Petstore API',
    description:
      'A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification',
    url: 'https://petstore.swagger.io/v2/swagger.json',
  },
  {
    name: 'GitHub API',
    description: 'GitHub REST API documentation',
    url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json',
  },
] as const;

export function LandingPopularApis() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAPI, setSelectedAPI] = useState<API | null>(null);
  const [showSwaggerUI, setShowSwaggerUI] = useState(false);
  const { setUrl } = useSwaggerStore();
  const { isMobile } = useWindowStore();

  const handleAPISelect = async (api: API) => {
    setSelectedAPI(api);
    setIsDropdownOpen(false);

    try {
      // Set the URL in the store
      await setUrl(api.url);
      setShowSwaggerUI(true);
    } catch (error) {
      console.error('Failed to load Swagger:', error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Popular APIs Dropdown */}
      <div className="relative mb-8">
        <button
          className="flex w-full items-center justify-between rounded-xl border bg-white px-6 py-4 text-left shadow-sm transition-colors hover:border-gray-700"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-gray-600">
            {selectedAPI ? selectedAPI.name : 'Select Popular API'}
          </span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-lg">
            {popularAPIs.map((api) => (
              <button
                key={api.name}
                className="flex w-full flex-col px-6 py-4 text-left hover:bg-gray-50"
                onClick={() => handleAPISelect(api)}
              >
                <span className="font-medium">{api.name}</span>
                <span className="text-sm text-gray-500">{api.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Split Layout Section */}
      <div className="h-[400px] rounded-xl border bg-white p-6">
        {showSwaggerUI ? (
          isMobile ? <MobileSplitLayout /> : <SplitLayout />
        ) : (
          <ContentSkeleton />
        )}
      </div>
    </div>
  );
}
