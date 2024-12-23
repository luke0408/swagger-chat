import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import 'swagger-ui-react/swagger-ui.css';

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "Swagger Chat",
  description: "Swagger Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
