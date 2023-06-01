import { Roboto_Flex } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import * as gtag from '@/utils/gtag';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { DehydratedState, QueryClientConfig } from 'react-query';
import '@/styles/globals.css';

export interface PageProps {
  dehydratedState?: DehydratedState;
}

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<PageProps> & {
  Component: NextPageWithLayout<PageProps>;
};

const defaultOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(() => new QueryClient(defaultOptions));

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>김프 김치프리미엄(kimchi premium) - KIMPUU</title>
        <meta name="description" content="김치프리미엄(김프) 및 암호화폐 시세를 실시간 제공합니다." />
        <meta name="robots" content="index,follow" />

        <meta property="og:title" content="KIMPUU - 김치프리미엄 및 암호화폐 시세 확인" />
        <meta property="og:description" content="김치프리미엄 및 암호화폐 시세를 실시간 제공합니다." />
        <meta property="og:url" content="https://kimpuu.com" />
        <meta property="og:image" content="https://kimpuu.com/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="KIMPUU - 김치프리미엄 및 암호화폐 시세 확인" />
        <meta property="og:locale" content="ko_KR" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171717" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://kimpuu.com" />
      </Head>
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

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={`${roboto.variable} font-roboto`}>{getLayout(<Component {...pageProps} />)}</main>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
