"use client";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "../ui/button";
import {
  checkoutOrder,
  createNewOrder,
} from "@/lib/database/actions/order.action";
import { delteCartofUser } from "@/lib/database/actions/cart.action";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEYe);

const Checkout = ({ data, userId }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    await createNewOrder(data);
    await checkoutOrder(data);
    await delteCartofUser(userId);
  };

  return (
    <Button
      onClick={onCheckout}
      className=" bg-slate-200 text-slate-600 mb-6 hover:bg-slate-300 hover:text-slate-700"
    >
      Proceed
    </Button>
  );
};

export default Checkout;
