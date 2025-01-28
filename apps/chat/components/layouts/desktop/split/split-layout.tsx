'use client';

import Split from 'react-split';
import { SwaggerPanel } from './swagger-panel';
import { ChatPanel } from './chat-panel';

export const SplitLayout = () => {
  return (
    <div className="h-full">
      <Split
        className="split h-full"
        sizes={[40, 60]}
        minSize={[300, 400]}
        gutterSize={4}
        snapOffset={30}
        direction={'horizontal'}
      >
        <SwaggerPanel />
        <ChatPanel />
      </Split>
    </div>
  );
};
