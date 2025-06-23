import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// Optionally create a utility function for absolute URL
const settingsUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings`;

export async function GET() {
  try {
    const { userId } = await auth; // ✅ Fixed: don't call it as a function
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ FIXED: explicitly define return type to avoid `never` issue
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    }) as {
      stripeCustomerId: string;
    } | null;

    if (userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    const customerEmail = user.emailAddresses?.[0]?.emailAddress;

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "MYR",
            product_data: {
              name: "Pro Version",
              description: "Unlimited AI Generator, please use visa 4242 4242 4242 4242",
            },
            unit_amount: 10000,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
