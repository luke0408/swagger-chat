import { pretendard } from '@/public/fonts/font';
import 'swagger-ui-react/swagger-ui.css';
import './globals.css';

export const metadata = {
  title: 'Swagger Chat',
  description: 'Chat with your Swagger API Documentation',
  icons: {
    icon: '/favicon.ico',
  },
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
