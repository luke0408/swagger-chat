import { BoltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export type APIType = {
  name: string;
  description: string;
  subDescription?: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPath?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
};

interface APIIconProps {
  api: APIType;
  isSelected: boolean;
  index: number;
  onClick: () => void;
  totalIcons: number;
}

export const APIIcon: React.FC<APIIconProps> = ({ api, isSelected, index, onClick }) => {
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

export const POPULAR_APIS: APIType[] = [
  {
    name: 'Petstore API',
    description:
      'A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification',
    subDescription: 'Click to try it out',
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
    subDescription: 'More APIs will be available soon! Stay tuned for updates.',
    url: '',
    icon: BoltIcon,
    gradientColors: {
      from: '#97e866',
      to: '#75c346',
    },
  },
];
