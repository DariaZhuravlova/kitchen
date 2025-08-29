"use client";

import {registerUser} from "@/actions/register";
import {Button, Form, Input} from "@heroui/react";
import {useState} from "react";

interface IProps {
    onClose: () => void;
}

const RegistrationForm = ({onClose}: IProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Форма відправлена:", formData);

        const result = await registerUser(formData);

        console.log("Результат:", result);

        onClose();
    };

    return (
        <Form
            className="w-full"
            onSubmit={handleSubmit}
        >
            <Input
                aria-label="Email"
                isRequired
                name="email"
                placeholder="Введіть email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none ",
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                validate={(value) => {
                    if (!value) return "Email обов’язковий";
                    if (!validateEmail(value)) return "Некоректний email";
                    return null;
                }}
            />
            <Input
                isRequired
                name="password"
                placeholder="Введіть пароль"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none ",
                }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                validate={(value) => {
                    if (!value) return "Пароль обов’язковий";
                    if (value.length < 6) return "Пароль має бути не менше 6 символів";
                    return null;
                }}
            />
            <Input
                isRequired
                name="confirmPassword"
                placeholder="Підтвердіть пароль"
                type="password"
                value={formData.confirmPassword}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none ",
                }}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                validate={(value) => {
                    if (!value) return "Пароль для підтвердження обов’язковий";
                    if (value !== formData.password) return "Паролі не співпадають";
                    return null;
                }}
            />

            <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
                <Button
                    variant="light"
                    onPress={onClose}
                >
                    Скасувати
                </Button>
                <Button
                    color="primary"
                    type="submit"
                >
                    Зареєструватися
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;
