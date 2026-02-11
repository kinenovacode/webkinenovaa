import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(price);
}

// Helper para ejecutar queries de Prisma de forma segura
export async function safeQuery<T>(
    queryFn: () => Promise<T>,
    fallback: T
): Promise<T> {
    try {
        return await queryFn();
    } catch (error) {
        console.warn("Database query failed, using fallback data:", error);
        return fallback;
    }
}
