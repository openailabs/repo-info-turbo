'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

import type { ChromeAppRouter } from '@acme/api';

export const trpc = createTRPCReact<ChromeAppRouter>();

function getBaseUrl() {
  // if (typeof window !== "undefined")
  //   // browser should use relative path
  //   return "";
  // if (process.env.VERCEL_URL)
  //   // reference for vercel.com
  //   return `https://${process.env.VERCEL_URL}`;
  // if (process.env.RENDER_INTERNAL_HOSTNAME)
  //   // reference for render.com
  //   return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // // assume localhost
  // return `http://localhost:${process.env.PORT ?? 8002}`;
  return `http://localhost:8002`;
}

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc/chrome`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              'X-Api-Key': 'sk_live_xkbiparcywf75m95',
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
