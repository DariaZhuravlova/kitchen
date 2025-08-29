import {NextResponse} from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            take: 1, // только для проверки, не вытягиваем всю таблицу
        });

        return NextResponse.json({
            success: true,
            message: "Подключение к базе успешно",
            sampleUser: users[0] || null,
        });
    } catch (error) {
        console.error("Ошибка подключения к базе:", error);
        return NextResponse.json({
            success: false,
            message: "Не удалось подключиться к базе",
            error: String(error),
        });
    }
}
