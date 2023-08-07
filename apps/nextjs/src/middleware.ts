import { clerkClient } from '@clerk/nextjs';
import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
    signInUrl: '/signin',
    publicRoutes: [
        '/',
        '/signin(.*)',
        '/sso-callback(.*)',
        '/terms(.*)',
        '/pricing(.*)',
        '/privacy(.*)',
        '/api(.*)',
    ],
    debug: false,

    async afterAuth(auth, req) {
        // if (auth.isPublicRoute) {
        if (req.nextUrl.pathname.startsWith('/api/trpc/chrome')) {
            // Don't do anything for public routes
            // Except cors process

            // for chrome api cors
            // for further detail refer to: https://nextjs.org/docs/pages/building-your-application/routing/middleware
            const response = NextResponse.next();
            response?.headers.set('Access-Control-Allow-Origin', '*');
            response?.headers.set(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS'
            );
            response?.headers.set(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization, X-Api-Key'
            );
            return response;
        }

        if (auth.isPublicRoute) {
            // Don't do anything for public routes
            return NextResponse.next();
        }

        // if (req.nextUrl.pathname.startsWith("/api/trpc/chrome")) {
        //   const response = NextResponse.next();
        //   response?.headers.set("Access-Control-Allow-Origin", "*");
        //   response?.headers.set(
        //     "Access-Control-Allow-Methods",
        //     "GET, POST, PUT, DELETE, OPTIONS",
        //   );
        //   response?.headers.set(
        //     "Access-Control-Allow-Headers",
        //     "Content-Type, Authorization",
        //   );
        //   return response;
        // }

        const url = new URL(req.nextUrl.origin);
        const parts = req.nextUrl.pathname.split('/').filter(Boolean);

        if (!auth.userId) {
            // User is not signed in
            url.pathname = '/signin';
            return NextResponse.redirect(url);
        }

        if (req.nextUrl.pathname === '/dashboard') {
            // /dashboard should redirect to the user's dashboard
            // use their current workspace, i.e. /:orgId or /:userId
            url.pathname = `/${auth.orgId ?? auth.userId}`;
            return NextResponse.redirect(url);
        }

        /**
         * TODO: I'd prefer not showing the ID in the URL but
         * a more friendly looking slug. For example,
         * /org_foo34213 -> /foo
         * /user_bar123/project_acm234231sfsdfa -> /bar/baz
         */

        /**
         * TODO: Decide if redirects should 404 or redirect to /
         */

        const workspaceId = parts[0];
        const isOrg = workspaceId?.startsWith('org_');
        if (isOrg && auth.orgId !== workspaceId) {
            // User is accessing an org that's not their active one
            // Check if they have access to it
            const orgs = await clerkClient.users.getOrganizationMembershipList({
                userId: auth.userId,
            });
            const hasAccess = orgs.some((org) => org.id === workspaceId);
            if (!hasAccess) {
                url.pathname = `/`;
                return NextResponse.redirect(url);
            }

            // User has access to the org, let them pass.
            // TODO: Set the active org to the one they're accessing
            // so that we don't need to do this client-side.
            // This is currently not possible with Clerk but will be.
            return NextResponse.next();
        }

        const isUser = workspaceId?.startsWith('user_');
        if (isUser && auth.userId !== workspaceId) {
            // User is accessing a user that's not them
            url.pathname = `/`;
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    },
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
