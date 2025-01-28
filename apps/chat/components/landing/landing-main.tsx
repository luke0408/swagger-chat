'use client';

import { cn } from '@/lib';
import { Switch } from '@/components/ui';
import { StepItem } from './step-item';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { useChatStore } from '@/store/useChatStore';
import { useParams, useRouter } from 'next/navigation';
import { STEPS } from './steps';
import { SwaggerInput } from '../input/swagger-input';

export function LandingMain() {
  const { locale } = useParams();
  const router = useRouter();
  const { type, setType, submitSwagger } = useSwaggerStore();
  const { clearMessages } = useChatStore();

  const handleSubmit = async () => {
    // Reset existing chat data
    clearMessages();

    // Submit new Swagger API
    const result = await submitSwagger();
    if (result) {
      router.push(`/chat`);
    }
  };

  return (
    <main className={cn('w-full max-w-md space-y-6 md:space-y-8')}>
      <section>
        <h2 className={cn('mb-3 text-center text-xl font-semibold text-gray-700')}>Get Started</h2>
        {/* Steps */}
        <div className={cn('space-y-2 text-sm text-gray-600 md:space-y-4')}>
          {STEPS.map((step) => (
            <StepItem key={step.id} id={step.id} text={step.text} />
          ))}
        </div>
      </section>

      {/* Input Section */}
      <section className={cn('flex w-full flex-col items-center space-y-3 md:space-y-6')}>
        <Switch
          value={type === 'file'}
          onChange={(value) => setType(value ? 'file' : 'url')}
          leftLabel="URL"
          rightLabel="File"
        />

        <SwaggerInput type={type} onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
