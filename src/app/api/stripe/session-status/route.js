import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req) {

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is missing");
    }

    // Create new stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-03-31.basil"
    });

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {expand: ["payment_intent"]});
    return NextResponse.json({
        status: session.status,
        payment_status: session.payment_status,
        payment_intent_id: session.payment_intent_id,
        payment_intent_status: session.payment_intent_status
    });
}