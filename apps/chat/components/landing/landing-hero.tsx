'use client';

import { useRouter } from 'next/navigation';
import { useRef, useCallback } from 'react';

export function LandingHero() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="mb-2 text-xl font-bold md:text-2xl">SWAGGER CHAT</h1>
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">
          Don't read Swagger anymore Just Chat
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Transform your Swagger API documentation into an interactive chat experience
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center gap-4 sm:flex-row">
          <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            className="hover-button-wrapper rounded-lg bg-black px-8 py-3 text-white transition-colors hover:bg-gray-900"
            onClick={() => router.push('/chat/input')}
          >
            Try Now
          </button>
          <button className="rounded-lg border-2 border-gray-300 bg-white px-8 py-3 transition-colors hover:bg-gray-50">
            Learn More
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto my-8 flex w-full max-w-4xl items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <div className="text-sm font-medium text-gray-400">Features</div>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
    </div>
  );
}
