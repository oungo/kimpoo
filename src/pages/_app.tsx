import { Roboto_Flex } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Layout from '@/components/layout';
import type { AppProps } from 'next/app';
import type { DehydratedState } from 'react-query';
import '@/styles/globals.css';

export interface PageProps {
  dehydratedState?: DehydratedState;
}

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>KIMPOO</title>
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
        <meta property="og:url" content="https://kimpoo.vercel.app" />
        <meta property="og:title" content="KIMPOO - 김치 프리미엄 및 암호화폐 실시간 시세 확인" />
        {/* <meta property="og:image" content="" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
        <meta property="og:description" content="암호화폐 시세 및 김치프리미엄을 실시간 제공합니다." />
        <meta property="og:site_name" content="KIMPOO - 김치 프리미엄 및 암호화폐 실시간 시세 확인" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <Script src="https://kit.fontawesome.com/110e54d917.js" crossOrigin="anonymous" key="fontawesome" />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <main className={`max-w-screen-lg min-h-screen px-2 py-4 m-auto ${roboto.variable} font-roboto`}>
              <Component {...pageProps} />
            </main>
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
