'use client';

import { cn } from '@/lib';

interface StepItemProps {
  id: number;
  text: string;
}

export function StepItem({ id, text }: StepItemProps) {
  return (
    <div className={cn('flex items-start gap-3')}>
      <span className={cn('font-bold text-gray-700')}>{id}.</span>
      <span>{text}</span>
    </div>
  );
}
