'use client';

import Split from 'react-split';
import { ChatPanel } from '../chat-panel';
import { cn } from '@/lib';
import { SwaggerWrapper } from '../../swagger/viewer/swagger-wrapper';

export const MobileSplitLayout = () => {
  return (
    <div className="h-full">
      <Split
        className="split h-full"
        sizes={[50, 50]}
        minSize={[200, 200]}
        gutterSize={4}
        snapOffset={30}
        direction={'vertical'}
      >
        <div className={cn('overflow-y-auto')}>
          <div className="h-full">
            <SwaggerWrapper />
          </div>
        </div>
        <ChatPanel />
      </Split>
    </div>
  );
};
