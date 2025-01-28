'use client';

import { useRouter } from 'next/navigation';

export function LandingHero() {
  const router = useRouter();

  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="mb-2 text-xl font-bold md:text-2xl">SWAGGER CHAT</h1>
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">
          Don't read Swagger anymore Just Chat
        </h2>
        <p className="mb-8 text-sm text-gray-600 md:text-lg">
          Experience a new way to explore and understand your API documentation through natural
          conversations
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center gap-4 sm:flex-row">
          <button
            className="rounded-lg bg-black px-8 py-3 text-white transition-colors hover:bg-gray-900"
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
        <span className="text-gray-400">or try with popular APIs</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
    </div>
  );
}
