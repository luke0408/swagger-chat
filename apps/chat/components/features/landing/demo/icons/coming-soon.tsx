'use client';

import { BoltIcon } from '@heroicons/react/24/outline';
import { DemoType } from '../types';

const COMING_SOON_DEMO: DemoType = {
  name: 'Coming Soon',
  description: 'More APIs are coming soon!',
  subDescription: 'More APIs will be available soon! Stay tuned for updates.',
  url: '',
  gradientColors: {
    from: '#97e866',
    to: '#75c346',
  },
};

interface ComingSoonIconProps {
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

export function ComingSoonIcon({ isSelected, index, onClick }: ComingSoonIconProps) {
  const baseZIndex = 10;

  return (
    <button
      onClick={onClick}
      className={`absolute left-10 flex h-16 w-16 items-center justify-center rounded-full 
        hover:opacity-100
        ${isSelected ? 'z-50 -translate-y-5 scale-110 brightness-110' : 'brightness-90 hover:brightness-100'}
        duration-600 transform transition-all ease-out`}
      style={{
        zIndex: isSelected ? 50 : baseZIndex - index,
        transform: `translateX(calc(-50% + ${index * 40}px))`,
        background: `linear-gradient(135deg, ${COMING_SOON_DEMO.gradientColors?.from} 0%, ${COMING_SOON_DEMO.gradientColors?.to} 100%)`,
      }}
      title={COMING_SOON_DEMO.description}
    >
      <BoltIcon className="h-6 w-6 text-white/90 transition-transform hover:animate-[shake_0.5s_ease-in-out] active:animate-[shake_0.5s_ease-in-out]" />
    </button>
  );
}

export { COMING_SOON_DEMO };