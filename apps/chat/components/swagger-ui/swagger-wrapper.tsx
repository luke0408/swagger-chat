import { useSwaggerStore } from '@/store/useSwaggerStore';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { parseFileContent } from '@/lib/utils/validation';
import { useErrorBoundary } from './error-boundary';
import { cn } from '@/lib';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
});

export const SwaggerWrapper = () => {
  const { url, file } = useSwaggerStore();
  const [spec, setSpec] = useState<object | undefined>();
  const { ErrorBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!file) {
      setSpec(undefined);
      return;
    }

    file.text().then((content) => {
      const parsed = parseFileContent(content, file.name);
      setSpec(parsed as object);
    });
  }, [file]);

  if (!url && !spec) return null;

  return (
    <div className={cn('swagger-wrapper')}>
      <ErrorBoundary>
        <SwaggerUI url={url} spec={spec} />
      </ErrorBoundary>
    </div>
  );
};
