import { pretendard } from '@/public/fonts/font';
import 'swagger-ui-react/swagger-ui.css';
import './globals.css';
import { Metadata } from 'next';
import { JsonLd } from './JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Swagger Chat',
    template: '%s | Swagger Chat',
  },
  description: 'Chat with your Swagger API Documentation',

  icons: {
    icon: '/favicon.ico',
  },

  metadataBase: new URL('https://swagger-chat.vercel.app/'),

  openGraph: {
    title: 'Swagger Chat',
    description: 'Chat with your Swagger API Documentation',
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Swagger Chat OpenGraph Image',
      },
    ],
    type: 'website',
    siteName: 'Swagger Chat',
    locale: 'ko_KR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Swagger Chat',
    description: 'Chat with your Swagger API Documentation',
    images: ['/opengraph.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  keywords: ['Swagger', 'API Documentation', 'ChatGPT', 'AI Assistant', 'OpenAPI', 'API Chat'],
  authors: [{ name: 'Swagger Chat Team' }],
};

const swaggerChatSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Swagger Chat',
  description: 'Chat with your Swagger API Documentation',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'AI-powered Swagger documentation chat',
    'OpenAPI specification support',
    'Real-time API interaction',
  ],
  url: 'https://swagger-chat.vercel.app',
  provider: {
    '@type': 'Organization',
    name: 'Swagger Chat Team',
    url: 'https://swagger-chat.vercel.app',
  },
  sameAs: [
    'https://github.com/anonymousRecords/swagger-chat',
    'https://x.com/swagger_chat',
    'https://bsky.app/profile/swaggerchat.bsky.social',
    'https://www.instagram.com/swagger.chat/',
    'https://discord.gg/rMW7F43e',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <JsonLd data={swaggerChatSchema} />
      <body className={`${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
