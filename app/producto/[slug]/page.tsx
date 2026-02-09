import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./components/add-to-cart-button"; // We'll create this client component
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });

    if (!product) {
        notFound();
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden border bg-gray-50">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {discount > 0 && (
                            <div className="absolute top-4 left-4 bg-primary text-white text-lg font-bold px-4 py-2 rounded shadow-md">
                                -{discount}% OFF
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col space-y-8">
                        <div>
                            <p className="text-sm text-primary font-bold uppercase tracking-wider mb-2">
                                {product.category?.name}
                            </p>
                            <h1 className="text-4xl font-serif font-bold text-secondary mb-4">{product.name}</h1>

                            <div className="flex items-end gap-4 mb-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                )}
                            </div>

                            <div className="prose text-gray-600 max-w-none mb-8">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 space-y-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle2 className="text-green-500 h-5 w-5" />
                                <span>Disponible para agendar inmediatamente</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ShieldCheck className="text-primary h-5 w-5" />
                                <span>Garantía de satisfacción Kinenovaa</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Clock className="text-primary h-5 w-5" />
                                <span>Duración estimada: 60 min</span>
                            </div>

                            <div className="pt-4">
                                <AddToCartButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        slug: product.slug,
                                        imageUrl: product.imageUrl,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
