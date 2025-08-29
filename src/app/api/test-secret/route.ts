// app/api/test-secret/route.ts
import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({
        authSecret: process.env.AUTH_SECRET || "не задано",
    });
}
