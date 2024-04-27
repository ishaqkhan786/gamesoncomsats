"use server"
import Stripe from "stripe";
import { connectToDatabase } from ".."
import Order from "../models/order.model";
import { redirect} from 'next/navigation'
export const checkoutOrder = async (order) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const price = Number(order.totalAmount) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "pkr",
            unit_amount: price,
            product_data: {
              name: 'GamesOnComsats Order',
            },
          },
          quantity: order.totalQuantity,
        },
      ],
      metadata: {
        buyerId: order.user,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/e-shop/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url);
  } catch (error) {
    console.log('hehe',error);
    throw error;
  }
};

export const createNewOrder = async (data) =>
{
     try {
         await connectToDatabase();
         const order = await Order.create(data);
         return JSON.parse(JSON.stringify(order));
     } catch (error) {
        console.log(error);
     }
}

export const getAllOrders = async () =>
{
    try {
        await connectToDatabase();
        const orders = await Order.find().populate('user');

        return JSON.parse(JSON.stringify(orders))
        
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersOfUSer = async (id) =>
{
    try {
        await connectToDatabase();

        const orders = await Order.find({ user: id }).populate('user');
        return JSON.parse(JSON.stringify(orders))

        
    } catch (error) {
        console.log(error);
    }
}    