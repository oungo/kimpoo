import { Roboto_Flex } from 'next/font/google';
import Script from 'next/script';
import { NavigationEvents } from '@/components/NavigationEvents';
import Layout from '@/components/layout';
import * as gtag from '@/utils/gtag';
import Provider from 'app/provider';
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
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>

        <NavigationEvents />
      </body>
      <Script src="https://kit.fontawesome.com/110e54d917.js" crossOrigin="anonymous" key="fontawesome" />
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
    </html>
  );
}
