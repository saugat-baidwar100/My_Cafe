import {
  QueryClient,
  QueryClientProvider as QueryClientProviderRc,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient();

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProviderRc client={queryClient}>
      {/* <testimonialApi.ReactQueryProvider> */}
      {children}
      {/* </testimonialApi.ReactQueryProvider> */}

      {/* <ApiProvider>{children}</ApiProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderRc>
  );
}
