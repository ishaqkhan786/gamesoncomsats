"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoMdCart } from "react-icons/io";
import { createNewCart } from "@/lib/database/actions/cart.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddItemToCart = ({ userId, productId }) => {
  const router = useRouter();

  const [itemAdded, setitemAdded] = useState(false);
  const addItem = async () => {
    const data = {
      product: productId,
      user: userId,
    };
    toast.promise(createNewCart(data), {
      loading: "Adding to cart",
      success: "Item Added",
      error: "errrorrr",
    });
    setitemAdded(true);
    router.push("/e-shop");
    console.log(data);
  };
  return (
    <Button
      onClick={addItem}
      disabled={itemAdded === true}
      className=" font-semibold gap-4 text-lg px-7 rounded-full py-1"
    >
      {" "}
      <IoMdCart className=" text-xl " />
      Add to cart
    </Button>
  );
};

export default AddItemToCart;
