"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const { items, getTotal, getItemsCount } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
                    customer: formData,
                }),
            });

            if (!orderRes.ok) throw new Error("Error creating order");
            const { order } = await orderRes.json();

            // 2. Init Webpay Transaction
            const webpayRes = await fetch("/api/webpay/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: order.id }),
            });

            if (!webpayRes.ok) throw new Error("Error initiating payment");
            const { url, token } = await webpayRes.json();

            // 3. Redirect to Webpay
            // Create a form instantly and submit it to redirect with POST (required by Webpay sometimes, but SDK returns URL+Token usually for GET or form POST?)
            // Actually standard Webpay Plus REST returns url + token, and you POST to it.
            // Or you can create a form dynamically.

            const form = document.createElement("form");
            form.action = url;
            form.method = "POST";
            const tokenInput = document.createElement("input");
            tokenInput.type = "hidden";
            tokenInput.name = "token_ws";
            tokenInput.value = token;
            form.appendChild(tokenInput);
            document.body.appendChild(form);
            form.submit();

        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al procesar el pedido. Inténtalo nuevamente.");
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-serif font-bold text-secondary mb-4">Tu carrito está vacío</h1>
                <Button variant="luxury" onClick={() => window.location.href = '/tienda'}>
                    Ver Tratamientos
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-serif font-bold text-secondary mb-8 text-center">Finalizar Compra</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Datos de Contacto</h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    variant="luxury"
                                    size="lg"
                                    className="w-full text-lg"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Procesando...
                                        </>
                                    ) : (
                                        "Pagar con Webpay"
                                    )}
                                </Button>
                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Serás redirigido a una pasarela de pago segura. No almacenamos tus datos bancarios.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="bg-white p-8 rounded-lg shadow-sm lg:h-fit">
                        <h2 className="text-xl font-bold mb-6">Resumen del Pedido ({getItemsCount()})</h2>
                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 border">
                                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                                    </div>
                                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(getTotal())}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-secondary pt-2">
                                <span>Total</span>
                                <span>{formatPrice(getTotal())}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
