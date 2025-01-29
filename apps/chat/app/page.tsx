'use client';

import { LandingFooter } from '@/components/features/landing/landing-footer';
import { LandingHero } from '@/components/features/landing/landing-hero';
import { LandingPopularApis } from '@/components/features/landing/landing-popular-apis';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-8">
      <div className="flex flex-col items-center justify-center py-8">
        {/* Hero Section */}
        <LandingHero />

        {/* Popular APIs Section */}
        <LandingPopularApis />
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
