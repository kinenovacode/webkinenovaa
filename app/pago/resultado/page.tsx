import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Suspense } from "react";

interface SearchParamsProps {
    searchParams?: Promise<{
        status?: string;
        orderId?: string;
    }>;
}

function ResultContent({ status, orderId }: { status: string; orderId?: string }) {
    if (status === "PAID" || status === "AUTHORIZED") {
        return (
            <div className="text-center space-y-6">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
                <h1 className="text-4xl font-serif font-bold text-secondary">¡Pago Exitoso!</h1>
                <p className="text-gray-600 text-lg">
                    Tu compra ha sido procesada correctamente. Hemos enviado un correo con los detalles.
                </p>
                {orderId && (
                    <p className="font-mono bg-gray-100 p-2 rounded inline-block">
                        Orden #{orderId}
                    </p>
                )}
                <div className="pt-8">
                    <Button variant="luxury" size="lg" asChild>
                        <Link href="/">Volver al Inicio</Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (status === "ABORTED") {
        return (
            <div className="text-center space-y-6">
                <AlertCircle className="h-24 w-24 text-yellow-500 mx-auto" />
                <h1 className="text-4xl font-serif font-bold text-secondary">Pago Cancelado</h1>
                <p className="text-gray-600 text-lg">
                    Has cancelado el proceso de pago. No se ha realizado ningún cobro.
                </p>
                <div className="pt-8 flex justify-center gap-4">
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/checkout">Intentar Nuevamente</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/tienda">Seguir comprando</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Error or Rejected
    return (
        <div className="text-center space-y-6">
            <XCircle className="h-24 w-24 text-red-500 mx-auto" />
            <h1 className="text-4xl font-serif font-bold text-secondary">Pago Rechazado</h1>
            <p className="text-gray-600 text-lg">
                Ocurrió un problema con tu pago. Por favor, revisa tus datos o intenta con otro medio de pago.
            </p>
            <div className="pt-8 flex justify-center gap-4">
                <Button variant="luxury" size="lg" asChild>
                    <Link href="/checkout">Intentar Nuevamente</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/contacto">Contactar Soporte</Link>
                </Button>
            </div>
        </div>
    );
}

export default async function PagoResultadoPage({ searchParams }: SearchParamsProps) {
    const params = await searchParams;
    const status = params?.status || "ERROR";
    const orderId = params?.orderId;

    return (
        <div className="bg-white min-h-screen flex items-center justify-center py-20">
            <div className="container mx-auto px-4 max-w-2xl">
                <Suspense fallback={<div>Cargando resultado...</div>}>
                    <ResultContent status={status} orderId={orderId} />
                </Suspense>
            </div>
        </div>
    );
}
