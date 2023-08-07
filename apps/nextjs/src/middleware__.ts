import { NextResponse } from 'next/server';

export function middleware() {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const response = NextResponse.next();
    response?.headers.set('Access-Control-Allow-Origin', '*');
    response?.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    response?.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    return response;
}
