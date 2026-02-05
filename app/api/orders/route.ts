import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createOrderSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        quantity: z.number().min(1),
    })),
    customer: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
    }),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, customer } = createOrderSchema.parse(body);

        // 1. Calculate total from DB price (Never trust client price)
        const productIds = items.map((i) => i.id);
        const dbProducts = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        let total = 0;
        const orderItemsData = [];

        for (const item of items) {
            const dbProduct = dbProducts.find((p) => p.id === item.id);
            if (!dbProduct) {
                return NextResponse.json(
                    { error: `Product ${item.id} not found` },
                    { status: 400 }
                );
            }
            total += dbProduct.price * item.quantity;
            orderItemsData.push({
                productId: dbProduct.id,
                quantity: item.quantity,
                price: dbProduct.price, // Store price at time of purchase
            });
        }

        // 2. Create Order in DB
        const order = await prisma.order.create({
            data: {
                total,
                status: "PENDING",
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
