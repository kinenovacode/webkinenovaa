"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: string;
        slug: string;
        name: string;
        price: number;
        originalPrice?: number | null;
        imageUrl: string;
        category?: { name: string };
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            slug: product.slug,
            imageUrl: product.imageUrl,
        });
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Link href={`/producto/${product.slug}`} className="group block h-full">
            <div className="relative h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-100">

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {discount > 0 && (
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                            -{discount}%
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                    {product.category && (
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                            {product.category.name}
                        </p>
                    )}
                    <h3 className="text-lg font-bold font-serif text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                            <span className="text-lg font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </span>
                        </div>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
