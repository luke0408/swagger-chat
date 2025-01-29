import React, { useState } from 'react';
import Image from 'next/image';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useWindowStore } from '@/store/useWindowStore';
import { SplitLayout } from '@/components/layouts/desktop/split/split-layout';
import { MobileSplitLayout } from '@/components/layouts/desktop/split/mobile-split-layout';
import { ContentSkeleton } from '@/components/ui/skeleton';
import { BoltIcon } from '@heroicons/react/24/outline';

type APIType = {
  name: string;
  description: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPath?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
};

const popularAPIs: APIType[] = [
  {
    name: 'Petstore API',
    description:
      'A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification',
    url: 'https://petstore.swagger.io/v2/swagger.json',
    iconPath: '/demo/icon/paw.svg',
    gradientColors: {
      from: '#FF69B4',
      to: '#FF1493',
    },
  },
  {
    name: 'Coming Soon',
    description: 'More APIs are coming soon!',
    url: '',
    icon: BoltIcon,
    gradientColors: {
      from: '#97e866',
      to: '#75c346',
    },
  },
];

interface APIIconProps {
  api: APIType;
  isSelected: boolean;
  index: number;
  onClick: () => void;
  totalIcons: number;
}

const APIIcon: React.FC<APIIconProps> = ({ api, isSelected, index, onClick }) => {
  const baseZIndex = 10;
  const { icon: Icon, iconPath, gradientColors } = api;

  const renderIcon = () => {
    if (Icon) {
      return (
        <Icon className="h-6 w-6 text-white/90 transition-transform hover:animate-[shake_0.5s_ease-in-out] active:animate-[shake_0.5s_ease-in-out]" />
      );
    }
    if (iconPath) {
      return (
        <Image
          src={iconPath}
          alt={`${api.name} Icon`}
          width={24}
          height={24}
          className="animate-[float_2s_ease-in-out_infinite] text-white/90 transition-transform"
        />
      );
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      className={`absolute left-10 flex h-16 w-16 items-center justify-center rounded-full 
        ${!api.url ? 'hover:opacity-100' : 'animate-[glow_2s_ease-in-out_infinite] hover:scale-105 hover:brightness-110'}
        ${isSelected ? 'z-50 -translate-y-5 scale-110 brightness-110' : 'brightness-90 hover:brightness-100'}
        duration-600 transform transition-all ease-out`}
      style={{
        zIndex: isSelected ? 50 : baseZIndex - index,
        transform: `translateX(calc(-50% + ${index * 40}px))`,
        background: `linear-gradient(135deg, ${gradientColors?.from || '#4fd1c5'} 0%, ${gradientColors?.to || '#38b2ac'} 100%)`,
      }}
      title={api.description}
    >
      {renderIcon()}
    </button>
  );
};

export function LandingPopularApis() {
  const [selectedAPI, setSelectedAPI] = useState<APIType | null>(popularAPIs[0]);
  const [showSwaggerUI, setShowSwaggerUI] = useState(true);
  const { setUrl } = useSwaggerStore();
  const { isMobile } = useWindowStore();

  const handleAPISelect = async (api: APIType) => {
    setSelectedAPI(api);

    if (api.url) {
      try {
        await setUrl(api.url);
        setShowSwaggerUI(true);
      } catch (error) {
        console.error('Failed to load Swagger:', error);
      }
    } else {
      setShowSwaggerUI(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Interactive API Selector */}
      <div className="relative h-20 pl-48">
        {popularAPIs.map((api, index) => (
          <APIIcon
            key={api.name}
            api={api}
            isSelected={selectedAPI?.name === api.name}
            index={index}
            onClick={() => handleAPISelect(api)}
            totalIcons={popularAPIs.length}
          />
        ))}
      </div>

      {/* API Info */}
      {selectedAPI && (
        <div className="mb-8 rounded-lg bg-white p-4">
          <h3 className="font-medium">{selectedAPI.name}</h3>
          <p className="text-sm text-gray-600">{selectedAPI.description}</p>
          {!selectedAPI.url && (
            <p className="mt-2 text-sm text-green-600">
              More APIs will be available soon! Stay tuned for updates.
            </p>
          )}
        </div>
      )}

      {/* Split Layout Section */}
      <div className="h-[400px] rounded-xl border bg-white p-6">
        {showSwaggerUI ? isMobile ? <MobileSplitLayout /> : <SplitLayout /> : <ContentSkeleton />}
      </div>
    </div>
  );
}
