import {object, string, z} from "zod";

export const signInSchema = object({
    email: string()
        .min(1, {message: "Email обов'язковий"})
        .email({message: "Невірний формат email"}),
    password: string()
        .min(6, {message: "Пароль повинен бути більше 6 символів"})
        .max(32, {message: "Пароль повинен бути менше 32 символів"}),
});

export const ingredientSchema = object({
    name: string().min(1, {message: "Назва обов'язкова"}),
    category: z.enum(["VEGETABLES", "FRUITS", "MEAT", "DAIRY", "SPICES", "OTHER"]),
    unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
    pricePerUnit: z
        .number()
        .refine((val) => val === null || val >= 0, {
            message: "Ціна повинна бути додатньою",
        })
        .nullable(),
    description: string().optional(),
});
