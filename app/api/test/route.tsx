import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (request.method === 'POST') {
        console.log("POST");
    }
    
    return NextResponse.json({ message: "Hello "}, { status: 200 });
}