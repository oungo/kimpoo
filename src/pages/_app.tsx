import type { AppProps } from 'next/app';
import type { DehydratedState } from 'react-query';
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
