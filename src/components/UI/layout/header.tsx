"use client";

import {layoutConfig} from "@/config/layout.config";
import {siteConfig} from "@/config/site.config";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import {signOutFunc} from "@/actions/sign-out";
import {useAuthStore} from "@/store/auth.store";

export const Logo = () => {
    return (
        <Image
            src="/logo.png"
            alt={siteConfig.title}
            width={26}
            height={26}
            priority
        />
    );
};

export default function Header() {
    const pathname = usePathname();

    const {isAuth, session, status, setAuthState} = useAuthStore();

    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (error) {
            console.error("error", error);
        }

        setAuthState("unauthenticated", null);
    };

    const getNavItems = () => {
        return siteConfig.navItems
            .filter((item) => {
                if (item.href === "/ingredients") {
                    return isAuth;
                }
                return true;
            })
            .map((item) => {
                const isActive = pathname === item.href;
                return (
                    <NavbarItem key={item.label}>
                        <Link
                            color="foreground"
                            href={item.href}
                            className={`${isActive ? "text-primary" : "text-foreground"}`}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                );
            });
    };

    return (
        <Navbar style={{height: layoutConfig.headerHeight}}>
            <NavbarBrand>
                <Link
                    href="/"
                    className="flex gap-1"
                >
                    <Logo />
                    <p className="font-bold text-inherit">{siteConfig.title}</p>
                </Link>
            </NavbarBrand>

            <NavbarContent
                className="hidden sm:flex gap-4"
                justify="center"
            >
                {getNavItems()}
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuth && <p>Привіт, {session?.user?.email}!</p>}

                {status === "loading" ? (
                    <p>Завантаження...</p>
                ) : !isAuth ? (
                    <>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="secondary"
                                href="#"
                                variant="flat"
                                onPress={() => setIsLoginOpen(true)}
                            >
                                Увійти
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="#"
                                variant="flat"
                                onPress={() => setIsRegistrationOpen(true)}
                            >
                                Реєстрація
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="secondary"
                            href="#"
                            variant="flat"
                            onPress={handleSignOut}
                        >
                            Вийти
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
            <RegistrationModal
                isOpen={isRegistrationOpen}
                onClose={() => setIsRegistrationOpen(false)}
            />
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </Navbar>
    );
}
