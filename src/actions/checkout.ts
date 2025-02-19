"use server";

import { auth } from "@/auth";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Cart } from "./redis";

export async function checkOut() {
  const authSession = await auth();

  const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

  if (!authSession?.user) {
    return redirect("/auth/login");
  }

  let cart: Cart | null = await redis.get(`cart-${authSession.user.id}`);

  if (cart && cart.items.length > 0) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: item.image,
          },
        },
        quantity: item.quantity,
      }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
      metadata: {
        userId: authSession.user.id as string,
      },
    });
    return redirect(session.url as string);
  }
}
