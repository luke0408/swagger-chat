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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NXG9KG7S');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <JsonLd data={swaggerChatSchema} />
        {children}
      </body>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NXG9KG7S"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </html>
  );
}
