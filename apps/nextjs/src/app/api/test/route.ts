import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function POST(req: NextRequest) {
    console.log('POST hi');
    //   return NextResponse.json({ message: "hi" }, { status: 200 });
    const result = { message: 'hi' };

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

//curl -i -X 'POST'  -H 'Content-Type: text/plain;charset=UTF-8'  --data-raw '{"owner":"Significant-Gravitas","repo":"Auto-GPT"}' "http://localhost:5175/api/hi"
