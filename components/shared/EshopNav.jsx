import React from "react";
import { IoMdCart } from "react-icons/io";
import Cart from "./Cart";
import { getCartItems } from "@/lib/database/actions/cart.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "../ui/button";
import Link from "next/link";
const EshopNav = async () => {
  const user = await getServerSession(authOptions);
  const userId = user.user.id.toString();
  const cart = await getCartItems(userId);
  // console.log("🚀 ~ EshopNav ~ cart:", cart);
  return (
    <div className=" w-full bg-white rounded-md shadow p-4 flex items-center justify-between">
      <h3 className=" font-semibold text-2xl">Checkout Products</h3>
      <div className=" flex items-center justify-center gap-3">
        {user.user.role === "admin" ? (
          <Link href={"/e-shop/order"}>
            <Button className=" bg-white text-primary border-2 hidden hover:text-white md:block border-primary">
              Manage Orders
            </Button>
          </Link>
        ) : (
          <Link href={`/e-shop/order/${userId}`}>
            <Button className=" bg-white text-primary border-2 hidden hover:text-white md:block border-primary">
              Your Orders
            </Button>
          </Link>
        )}

        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default EshopNav;
