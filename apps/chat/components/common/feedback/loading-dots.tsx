import { cn } from '@/lib';

export function LoadingDots() {
  return (
    <div className={cn('flex items-center space-x-2 text-sm text-gray-500')}>
      <div className={cn('h-2 w-2 animate-bounce rounded-full bg-gray-400')} />
      <div className={cn('h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]')} />
      <div className={cn('h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]')} />
    </div>
  );
}
