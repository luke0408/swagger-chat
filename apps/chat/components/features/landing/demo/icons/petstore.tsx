'use client';

import Image from 'next/image';
import { DemoType } from '../types';

const PETSTORE_DEMO: DemoType = {
  name: 'Petstore API',
  description: 'A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification',
  subDescription: 'Click to try it out',
  url: 'https://petstore.swagger.io/v2/swagger.json',
  gradientColors: {
    from: '#FF69B4',
    to: '#FF1493',
  },
};

interface PetstoreIconProps {
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

export function PetstoreIcon({ isSelected, index, onClick }: PetstoreIconProps) {
  const baseZIndex = 10;

  return (
    <button
      onClick={onClick}
      className={`absolute left-10 flex h-16 w-16 items-center justify-center rounded-full 
        animate-[glow_2s_ease-in-out_infinite] hover:scale-105 hover:brightness-110
        ${isSelected ? 'z-50 -translate-y-5 scale-110 brightness-110' : 'brightness-90 hover:brightness-100'}
        duration-600 transform transition-all ease-out`}
      style={{
        zIndex: isSelected ? 50 : baseZIndex - index,
        transform: `translateX(calc(-50% + ${index * 40}px))`,
        background: `linear-gradient(135deg, ${PETSTORE_DEMO.gradientColors?.from} 0%, ${PETSTORE_DEMO.gradientColors?.to} 100%)`,
      }}
      title={PETSTORE_DEMO.description}
    >
      <Image
        src="/demo/icon/paw.svg"
        alt="Petstore Icon"
        width={24}
        height={24}
        className="animate-[float_2s_ease-in-out_infinite] text-white/90 transition-transform"
      />
    </button>
  );
}

export { PETSTORE_DEMO };