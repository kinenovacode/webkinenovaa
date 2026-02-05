import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// @ts-ignore
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from "transbank-sdk";

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({ error: "Order ID required" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Configure Webpay
        // For production, use env vars. For now, defaulting to Integration
        const commerceCode = process.env.TRANSBANK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
        const apiKey = process.env.TRANSBANK_API_KEY || IntegrationApiKeys.WEBPAY;
        const environment = process.env.TRANSBANK_ENV === 'PRODUCTION' ? Environment.Production : Environment.Integration;

        const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, environment));

        const buyOrder = order.id.slice(0, 26); // Transbank limit 26 chars usually
        const sessionId = `session-${Date.now()}`;
        const amount = order.total;
        const returnUrl = `${process.env.BASE_URL || "http://localhost:3000"}/api/webpay/retorno`;

        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

        // Save token to order
        await prisma.order.update({
            where: { id: order.id },
            data: { transbankToken: response.token },
        });

        return NextResponse.json({
            url: response.url,
            token: response.token,
        });

    } catch (error) {
        console.error("Webpay Create Error:", error);
        return NextResponse.json(
            { error: "Payment initiation failed" },
            { status: 500 }
        );
    }
}
