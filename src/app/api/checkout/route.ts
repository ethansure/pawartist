import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe only if the secret key is available
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  return new Stripe(secretKey);
};

const PRICES = {
  pro: {
    name: "PetPortraitAI Pro",
    description: "20 portrait generations, all styles, HD downloads",
    amount: 999, // $9.99 in cents
  },
  unlimited: {
    name: "PetPortraitAI Unlimited",
    description: "Unlimited generations, all styles, Ultra HD, commercial license",
    amount: 2999, // $29.99 in cents
  },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, successUrl, cancelUrl } = await request.json();

    if (!plan || !PRICES[plan as keyof typeof PRICES]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    
    if (!stripe) {
      // Demo mode - Stripe not configured
      console.log("Demo mode: Stripe not configured");
      return NextResponse.json({
        demo: true,
        message: "Stripe not configured. Set STRIPE_SECRET_KEY in .env.local",
        checkoutUrl: successUrl || "/create?payment=demo",
      });
    }

    const priceData = PRICES[plan as keyof typeof PRICES];
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: priceData.name,
              description: priceData.description,
              images: ["https://petportraitai.com/og-image.jpg"],
            },
            unit_amount: priceData.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${origin}/create?payment=success&plan=${plan}`,
      cancel_url: cancelUrl || `${origin}/create?payment=cancelled`,
      metadata: {
        plan,
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
