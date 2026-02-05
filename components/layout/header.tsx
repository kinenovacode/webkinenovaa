"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
    const { getItemsCount, setIsOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Logo */}
                <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
                    <h1 className={cn("text-2xl font-serif font-bold tracking-wide transition-colors", scrolled ? "text-secondary" : "text-secondary md:text-white")}>
                        KINE<span className="text-primary">NOVAA</span>
                    </h1>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 mx-8">
                    {[
                        { name: "Inicio", href: "/" },
                        { name: "Tratamientos", href: "/tienda" },
                        { name: "Ofertas", href: "/tienda?filter=ofertas" },
                        { name: "Sucursales", href: "/#sucursales" },
                        { name: "Contacto", href: "/contacto" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider",
                                scrolled ? "text-gray-700" : "text-gray-200"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("hidden md:flex gap-2", scrolled ? "text-gray-700" : "text-white")}
                    >
                        <User className="h-5 w-5" />
                        <span className="hidden lg:inline">Mi Cuenta</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("relative group", scrolled ? "text-gray-700" : "text-white (md:text-white)")}
                        onClick={() => setIsOpen(true)}
                    >
                        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        {mounted && getItemsCount() > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {getItemsCount()}
                            </span>
                        )}
                    </Button>

                    <Button variant="luxury" size="sm" className="hidden md:flex ml-2" asChild>
                        <Link href="https://wa.me/56912345678" target="_blank">
                            Agenda Gratis
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
