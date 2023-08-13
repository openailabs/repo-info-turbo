import { createTRPCContext } from '@acme/api';
import { chromeRouter } from '@acme/api/src/chrome';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { NextRequest } from 'next/server';

// we use prisma as ORM, but prisma does not support edge yet so run on normal node environment
// export const runtime = 'edge';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc/chrome',
        router: chromeRouter,
        req: req,
        createContext: () => createTRPCContext({ req }),
        onError: ({ error }) => {
            console.log('Error in tRPC handler (chrome)');
            console.error(error);
        },
    });

export { handler as GET, handler as POST };
