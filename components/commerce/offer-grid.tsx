"use client";

import { ProductCard } from "./product-card";
import { Prisma } from "@prisma/client";

// Mock type since we might not have generated client fully loaded in IDE
type Product = {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number | null;
    imageUrl: string;
    category?: { name: string };
};

interface OfferGridProps {
    products: Product[];
}

export function OfferGrid({ products }: OfferGridProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-8 text-secondary">
                    Ofertas Destacadas
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
