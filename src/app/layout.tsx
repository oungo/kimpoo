import { Roboto_Flex } from 'next/font/google';
import Script from 'next/script';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Nav from '@/components/layout/Nav';
import * as gtag from '@/utils/gtag';
import Provider from 'app/provider';
import '@/styles/globals.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${roboto.variable} font-roboto`}>
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

        <Provider>
          <Header />
          <Nav />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
