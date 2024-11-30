import { NextResponse } from "next/server";

// CORS setup
export function middleware(req: Request) {
    const corsHeaders: { [key: string]: string } = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const response = NextResponse.next();
    Object.keys(corsHeaders).forEach((key: string) => {
        response.headers.set(key, corsHeaders[key]);
    });

    return response;
}