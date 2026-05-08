import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is missing");
    }

    // Create new stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-03-31.basil"
    });

    try {
        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            ui_mode: "custom",
            line_items: [
                {
                    price: "price_1S7VRxIvZzaibreSx8t3NC1C",
                    quantity: 1
                }
            ],
            mode: "subscription",
            return_url: `http://localhost:3000/premium/checkout/complete?session_id={CHECKOUT_SESSION_ID}` // Return here after checkout
        });

        return NextResponse.json({ clientSecret: session.client_secret });
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}