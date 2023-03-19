import { AppProps } from 'next/app';
import { useState } from 'react';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

interface PageProps {
  dehydratedState?: DehydratedState;
}

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
