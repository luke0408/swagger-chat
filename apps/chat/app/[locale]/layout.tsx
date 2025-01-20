import { pretendard } from '@/public/fonts/font';
import { LanguageInitializer } from '@/components/language-initializer';
import 'swagger-ui-react/swagger-ui.css';
import './globals.css';

export const metadata = {
  title: 'Swagger Chat',
  description: 'Chat with your Swagger API Documentation',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html>
      <body className={`${pretendard.className} antialiased`}>
        <LanguageInitializer locale={params.locale} />
        {children}
      </body>
    </html>
  );
}
