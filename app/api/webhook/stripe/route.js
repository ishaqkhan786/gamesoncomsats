import stripe from "stripe";
import { NextResponse } from "next/server";
import { delteCartofUser } from "@/lib/database/actions/cart.action";

export async function POST(request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") ;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    console.log("Checkout session completed", id, amount_total, metadata);
    // const order = {
    //   stripeId: id,
    //   eventId: metadata?.eventId || "",
    //   buyerId: metadata?.buyerId || "",
    //   totalAmount: amount_total ? (amount_total / 100).toString() : "0",
    //   createdAt: new Date(),
    // };
    await delteCartofUser(metadata.buyerId);
    // const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK"});
  }

  return new Response("", { status: 200 });
}
