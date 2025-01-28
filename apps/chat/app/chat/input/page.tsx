'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { cn } from '@/lib';
import { Switch } from '@/components/ui';
import { SwaggerInput } from '@/components/input/swagger-input';
import { useChatStore } from '@/store/useChatStore';

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
        <button
          className={cn('rounded-lg p-2 hover:bg-gray-100')}
          aria-label="Go back"
          onClick={onBackClick}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
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
