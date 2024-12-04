import { NextResponse } from "next/server";

export async function GET(request: Request) {    
    return NextResponse.json({ Terminals:  [
        "Harvey Milk Terminal 1",
        "Terminal 2",
        "Terminal 3",
        "International Terminal A",
        "International Terminal G",
        "Dianne Feinstein International Terminal"
    ]}, { status: 200 });
}