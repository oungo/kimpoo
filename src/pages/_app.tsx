import type { AppProps } from 'next/app';
import type { DehydratedState } from 'react-query';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css';

export interface PageProps {
  dehydratedState?: DehydratedState;
}

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
      </Head>
      <Script
        src="https://kit.fontawesome.com/110e54d917.js"
        crossOrigin="anonymous"
        key="fontawesome"
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
