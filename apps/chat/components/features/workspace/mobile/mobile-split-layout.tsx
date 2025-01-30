'use client';

import Split from 'react-split';
import { ChatPanel } from '../chat-panel';
import { SwaggerPanel } from '../swagger-panel';

export const MobileSplitLayout = () => {
  return (
    <Split
      className="split h-full"
      minSize={[200, 400]}
      gutterSize={4}
      snapOffset={30}
      direction={'vertical'}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <SwaggerPanel />
      <ChatPanel />
    </Split>
  );
};
