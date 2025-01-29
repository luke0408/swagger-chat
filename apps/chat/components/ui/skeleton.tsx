'use client';

import { cn } from '@/lib';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded bg-gray-200', className)} {...props} />;
}

export function ContentSkeleton() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-[calc(100%-120px)]" />
    </div>
  );
}
