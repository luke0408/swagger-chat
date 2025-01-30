'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { cn } from '@/lib';
import { SwaggerInput } from '@/components/features/swagger/input/swagger-input';
import { useChatStore } from '@/store/useChatStore';
import { Switch } from '@/components/common/\btoggle/switch';
import { BackButton } from '@/components/common/buttons/back-button';

const InputPage = () => {
  const router = useRouter();
  const { type, setType, submitSwagger } = useSwaggerStore();
  const { clearMessages } = useChatStore();

  const onBackClick = () => {
    router.push('/');
  };

  const handleSubmit = async () => {
    clearMessages();
    const result = await submitSwagger();
    if (result) {
      router.push('/chat');
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-16">
      <div className="mb-8">
        <BackButton onClick={onBackClick} />
        <h1 className="mt-4 text-2xl font-bold">Start with Your API</h1>
      </div>

      <section className={cn('flex w-full flex-col items-center space-y-3 md:space-y-6')}>
        <div className={cn('flex w-full justify-end')}>
          <Switch
            value={type === 'file'}
            onChange={(value) => setType(value ? 'file' : 'url')}
            leftLabel="URL"
            rightLabel="File"
          />
        </div>
        <SwaggerInput type={type} onSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export default InputPage;
