import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Check } from "lucide-react";
import { safeQuery } from "@/lib/utils";

export const revalidate = 60;

interface TiendaPageProps {
    searchParams?: Promise<{
        category?: string;
        sort?: string;
    }>;
}

export default async function TiendaPage({ searchParams }: TiendaPageProps) {
    const params = await searchParams;
    const categorySlug = params?.category;
    const sort = params?.sort || "newest";

    // Build query parameters
    const where: Prisma.ProductWhereInput = {};
    if (categorySlug) {
        where.category = { slug: categorySlug };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };

    // Use safeQuery to handle database connection errors gracefully
    const products = await safeQuery(
        () => prisma.product.findMany({ where, orderBy, include: { category: true } }),
        []
    );

    const categories = await safeQuery(
        () => prisma.category.findMany(),
        []
    );

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-serif font-bold text-center mb-8 text-secondary">
                    Nuestros Tratamientos
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-secondary border-b pb-2">Categorías</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/tienda"
                                    className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${!categorySlug ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}`}
                                >
                                    Todos
                                    {!categorySlug && <Check className="h-4 w-4" />}
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/tienda?category=${cat.slug}`}
                                        className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${categorySlug === cat.slug ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}`}
                                    >
                                        {cat.name}
                                        {categorySlug === cat.slug && <Check className="h-4 w-4" />}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4 text-secondary border-b pb-2">Ordenar por</h3>
                            <div className="space-y-2 flex flex-col">
                                <Link href={{ query: { ...params, sort: 'newest' } }} className={`text-sm py-1 hover:text-primary ${sort === 'newest' ? 'font-bold text-primary' : 'text-gray-600'}`}>
                                    Lo más nuevo
                                </Link>
                                <Link href={{ query: { ...params, sort: 'price_asc' } }} className={`text-sm py-1 hover:text-primary ${sort === 'price_asc' ? 'font-bold text-primary' : 'text-gray-600'}`}>
                                    Precio: Menor a Mayor
                                </Link>
                                <Link href={{ query: { ...params, sort: 'price_desc' } }} className={`text-sm py-1 hover:text-primary ${sort === 'price_desc' ? 'font-bold text-primary' : 'text-gray-600'}`}>
                                    Precio: Mayor a Menor
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-xl text-gray-500">No se encontraron productos en esta categoría.</p>
                                <Button variant="link" asChild className="mt-4">
                                    <Link href="/tienda">Ver todos los productos</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="h-full">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
