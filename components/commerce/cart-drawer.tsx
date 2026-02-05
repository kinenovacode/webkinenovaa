"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { cn, formatPrice } from "@/lib/utils";

export function CartDrawer() {
    const { isOpen, setIsOpen, items, updateQuantity, removeItem, getTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-4">
                        <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Tu Carrito
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <ShoppingBag className="h-16 w-16 text-gray-300" />
                                <p className="text-gray-500">Tu carrito está vacío</p>
                                <Button variant="luxury" onClick={() => setIsOpen(false)}>
                                    Explorar Tratamientos
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 font-semibold">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 rounded-l-md"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-2 text-xs font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 rounded-r-md"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t px-4 py-4 space-y-4 bg-gray-50">
                            <div className="flex items-center justify-between text-base font-medium text-gray-900">
                                <p>Total</p>
                                <p>{formatPrice(getTotal())}</p>
                            </div>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Impuestos incluidos. Envío calculado al pagar.
                            </p>
                            <div className="grid gap-2">
                                <Button
                                    className="w-full"
                                    variant="luxury"
                                    size="lg"
                                    onClick={() => {
                                        setIsOpen(false);
                                        // Navigate to checkout
                                        window.location.href = '/checkout';
                                    }}
                                >
                                    Continuar al Pago
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.location.href = '/tienda';
                                    }}
                                >
                                    Seguir Comprando
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
