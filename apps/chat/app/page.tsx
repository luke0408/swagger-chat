'use client';

import { cn } from '@/lib/index';
import { LandingHeader } from '@/components/landing/landing-header';
import { LandingMain } from '@/components/landing/landing-main';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Header } from '@/components/ui/header/header';

export default function LandingPage() {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center bg-gray-50 px-8 md:p-0'
      )}
    >
      <Header isDefault={true} />
      <LandingHeader />
      <LandingMain />
      <LandingFooter />
    </div>
  );
}
