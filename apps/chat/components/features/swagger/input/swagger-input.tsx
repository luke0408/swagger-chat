'use client';

import { cn } from '@/lib';

import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useThrottle } from '@/hooks/useThrottle';
import { validateSwaggerUrl } from '@/lib/utils/validation';
import { useMemo } from 'react';
import { Input } from '@/components/common/inputs/input';
import { Button } from '@/components/common/buttons/button';
import { FileUploader } from '@/components/common/inputs/file-uploader';

interface SwaggerInputProps {
  type: 'url' | 'file';
  onSubmit: () => Promise<void>;
}

export function SwaggerInput({ type, onSubmit }: SwaggerInputProps) {
  const { url, setUrl, reset } = useSwaggerStore();
  const throttledSubmit = useThrottle(onSubmit, 1000);

  const submitButtonDisabled = useMemo(() => validateSwaggerUrl(url).success == false, [url]);

  return (
    <div className={cn('w-full')}>
      {type === 'url' ? (
        <div className={cn('flex h-28 flex-col justify-between')}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => reset()}
            placeholder="Enter OpenAPI URL"
          />
          <Button onClick={throttledSubmit} disabled={submitButtonDisabled}>
            Submit
          </Button>
        </div>
      ) : (
        <FileUploader onSuccess={onSubmit} />
      )}
    </div>
  );
}
