'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { QueryClientConfig } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const defaultOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};

const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(defaultOptions));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Provider;
