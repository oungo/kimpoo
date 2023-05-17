import { Roboto_Flex } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { DehydratedState } from 'react-query';
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

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>KIMPUU - 김치프리미엄 김프 암호화폐 시세</title>
        <meta
          name="keywords"
          content="김프,김치프리미엄,암호화폐,가상화폐,비트코인,이더리움,비트,이더,코인,역프,업비트,빗썸,바이낸스,binance,bitcoin,ethereum,btc,eth"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="subject" content="암호화폐 시세 및 김치프리미엄을 실시간 제공합니다." />
        <meta name="description" content="암호화폐 시세 및 김치프리미엄을 실시간 제공합니다." />
        <meta name="author" content="oungo" />
        <meta name="robots" content="index,follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kimpuu.com" />
        <meta property="og:title" content="KIMPUU - 김치 프리미엄 및 암호화폐 실시간 시세 확인" />
        {/* <meta property="og:image" content="" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
        <meta property="og:description" content="암호화폐 시세 및 김치프리미엄을 실시간 제공합니다." />
        <meta property="og:site_name" content="KIMPUU - 김치 프리미엄 및 암호화폐 실시간 시세 확인" />
        <meta property="og:locale" content="ko_KR" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171717" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="canonical" href="https://kimpuu.com" />
      </Head>
      <Script src="https://kit.fontawesome.com/110e54d917.js" crossOrigin="anonymous" key="fontawesome" />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={`${roboto.variable} font-roboto`}>{getLayout(<Component {...pageProps} />)}</main>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
