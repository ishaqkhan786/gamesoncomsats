"use client";
import React from "react";
import { Button } from "../ui/button";
import { BsFillHandbagFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { createNewCart } from "@/lib/database/actions/cart.action";
import { useRouter } from "next/navigation";
const BuyNow = ({ id, userId }) => {
  const router = useRouter();
  const buyItem = () => {
    const data = {
      product: id,
      user: userId,
    };
    toast.promise(createNewCart(data), {
      loading: "Adding to cart",
      success: "Checking out",
      error: "errrorrr",
    });
    router.push("/e-shop/checkout");
  };
  return (
    <Button
      onClick={buyItem}
      className=" font-semibold flex items-center gap-1 bg-white text-primary border-2 border-primary hover:text-blue-50 text-lg px-8 rounded-full py-1"
    >
      {" "}
      <BsFillHandbagFill className=" text-xl mr-2" />
      Buy Now
    </Button>
  );
};

export default BuyNow;
