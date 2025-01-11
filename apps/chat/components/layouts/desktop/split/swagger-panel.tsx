'use client';

import { SwaggerWrapper } from '@/components/swagger-ui/swagger-wrapper';
import { cn } from '@/lib';

export const SwaggerPanel = () => {
  return (
    <div className={cn('h-full overflow-y-auto')}>
      <SwaggerWrapper />
    </div>
  );
};
