"use client";

import RecipeCard from "@/components/common/recipe-card";
import {useRecipeStore} from "@/store/recipe.store";
import {Button} from "@heroui/react";
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Home() {
    const {recipes, isLoading, error} = useRecipeStore();
    const {data: session} = useSession();

    return (
        <>
            <div className="flex flex-col items-center mb-6">
                {session ? (
                    <p className="mb-2 text-gray-700">
                        ✅ Зареєстрований користувач може додавати рецепти та інгредієнти для страв
                    </p>
                ) : (
                    <p className="mb-2 text-gray-500">
                        🔑 Увійдіть, щоб мати можливість додавати рецепти та інгредієнти
                    </p>
                )}

                {session && (
                    <Link href="/recipes/new">
                        <Button color="primary">Додати рецепт</Button>
                    </Link>
                )}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {isLoading && <p>Завантаження...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                    />
                ))}
            </div>
        </>
    );
}
