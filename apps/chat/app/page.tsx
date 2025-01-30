'use client';

import { LandingHero } from '@/components/features/landing/landing-hero';
import { LandingPopularDemos } from '@/components/features/landing/landing-popular-demos';
import { LandingFooter } from '@/components/features/landing/landing-footer';
import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import { defaultMetadata } from './metadata';

export const metadata = {
  ...defaultMetadata,
  title: "Don't Read Swagger anymore | Swagger Chat",
};

export default function LandingPage() {
  const { clearMessages } = useChatStore();

  useEffect(() => {
    clearMessages();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex flex-col items-center px-4 py-8">
        <LandingHero />
        <LandingPopularDemos />
      </div>
      <LandingFooter />
    </main>
  );
}
