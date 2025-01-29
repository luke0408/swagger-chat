'use client';

import { cn } from '@/lib';
import { SwaggerWrapper } from '../swagger/viewer/swagger-wrapper';

export const SwaggerPanel = () => {
  return (
    <div className={cn('overflow-y-auto')}>
      <SwaggerWrapper />
    </div>
  );
};
