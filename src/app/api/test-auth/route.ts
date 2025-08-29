// app/api/test-auth/route.ts
import {auth} from "@/auth/auth";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    try {
        // Приведение к NextRequest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const session = await auth(req as any); // временно можно использовать `as any` для TS

        return NextResponse.json({
            success: true,
            user: session?.user || null,
            message: session ? "Сессия получена" : "Сессия не найдена",
        });
    } catch (error) {
        console.error("Ошибка получения сессии:", error);
        return NextResponse.json({
            success: false,
            message: "Не удалось получить сессию",
            error: String(error),
        });
    }
}
