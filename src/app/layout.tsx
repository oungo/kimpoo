import { Roboto_Flex } from 'next/font/google';
import '@/styles/globals.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${roboto.variable} font-roboto`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/js/theme.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
