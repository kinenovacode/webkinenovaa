import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// @ts-ignore
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from "transbank-sdk";
import { redirect } from "next/navigation";

// Webpay Plus sends a POST to the return URL with token_ws
// If cancelled, it might be TBK_TOKEN
export async function POST(req: Request) {
    const formData = await req.formData();
    const token_ws = formData.get("token_ws") as string;
    const tbk_token = formData.get("TBK_TOKEN") as string;
    const tbk_orden_compra = formData.get("TBK_ORDEN_COMPRA") as string;
    const tbk_id_sesion = formData.get("TBK_ID_SESION") as string;

    // Case: User aborted payment (usually GET or POST with TBK_TOKEN but no token_ws)
    // But Webpay Plus Rest usually POSTs.
    // Ideally, if token_ws is present, we commit.

    if (!token_ws && (tbk_token || tbk_orden_compra)) {
        // Aborted
        console.log("Payment aborted by user");
        return redirect("/pago/resultado?status=ABORTED");
    }

    if (!token_ws) {
        return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    try {
        // Configure Webpay
        const commerceCode = process.env.TRANSBANK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
        const apiKey = process.env.TRANSBANK_API_KEY || IntegrationApiKeys.WEBPAY;
        const environment = process.env.TRANSBANK_ENV === 'PRODUCTION' ? Environment.Production : Environment.Integration;

        const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, environment));

        // Commit transaction
        const response = await tx.commit(token_ws);

        // Update order status
        let status = "REJECTED";
        if (response.status === "AUTHORIZED") {
            status = "PAID";
        }

        await prisma.order.update({
            where: { transbankToken: token_ws },
            data: {
                status: status,
                authorizationCode: response.authorization_code,
            },
        });

        // Redirect to Result Page
        return redirect(`/pago/resultado?status=${status}&orderId=${response.buy_order}`);

    } catch (error) {
        console.error("Webpay Commit Error:", error);
        // If commit fails (e.g. already committed), check DB or fail.
        // We redirect to error page.
        return redirect("/pago/resultado?status=ERROR");
    }
}

// Sometimes Webpay might do GET (unlikely in Production Webpay Plus standard, but safe to handle or ignore)
export async function GET(req: Request) {
    return redirect("/checkout");
}
