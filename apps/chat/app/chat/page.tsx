import WorkspaceLayout from '@/components/features/workspace/workspace-layout';
import { defaultMetadata } from '@/app/metadata';

export const metadata = {
  ...defaultMetadata,
  title: 'Chat Interface',
};

export default function ChatPage() {
  return <WorkspaceLayout />;
}
