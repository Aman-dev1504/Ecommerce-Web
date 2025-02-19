import { Cart } from "@/actions/redis";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (err: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      if (!userId) {
        console.error("User ID missing from metadata");
        return;
      }

      const cart: Cart | null = await redis.get(`cart-${userId}`);

      if (cart && cart.items.length > 0) {
        // Create the order and order items in the database
        await db.order.create({
          data: {
            userId: userId,
            totalPrice: (session.amount_total as number) / 100, // Convert from cents to dollars
            items: {
              create: cart.items.map(
                (item) =>
                  ({
                    quantity: item.quantity,
                    price: item.price,
                    product: { connect: { id: item.id } }, // Assuming you have a product relation
                  } as any)
              ),
            },
          },
        });

        // Clear the cart after order creation
        await redis.del(`cart-${userId}`);
      }
      break;
      // Handle other event types if needed
    }
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
