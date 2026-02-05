"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        slug: string;
        imageUrl: string;
    };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem, setIsOpen } = useCartStore();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            slug: product.slug,
            imageUrl: product.imageUrl,
        });
        setIsOpen(true);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            onClick={handleAdd}
            className={cn("w-full text-lg", added ? "bg-green-600 hover:bg-green-700" : "")}
            variant={added ? "default" : "luxury"}
        >
            {added ? (
                <>
                    <Check className="mr-2 h-5 w-5" /> Añadido al Carrito
                </>
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
                </>
            )}
        </Button>
    );
}
