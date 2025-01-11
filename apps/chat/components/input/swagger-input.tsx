'use client';

import { cn } from '@/lib';
import { Button, Input } from '@/components/ui';
import { FileUploader } from './file-uploader';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useThrottle } from '@/hooks/useThrottle';
import { useTranslation } from 'react-i18next';

interface SwaggerInputProps {
  type: 'url' | 'file';
  onSubmit: () => Promise<void>;
}

export function SwaggerInput({ type, onSubmit }: SwaggerInputProps) {
  const { t } = useTranslation();
  const { url, setUrl, reset } = useSwaggerStore();
  const throttledSubmit = useThrottle(onSubmit, 1000);

  return (
    <div className={cn('w-full')}>
      {type === 'url' ? (
        <div className={cn('flex h-28 flex-col justify-between')}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => reset()}
            placeholder={t('landing.main.input.placeholder')}
          />
          <Button onClick={throttledSubmit} className={cn('w-full')}>
            {t('landing.main.input.submit')}
          </Button>
        </div>
      ) : (
        <FileUploader onSuccess={onSubmit} />
      )}
    </div>
  );
}
