"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoMdCart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import { updateCartItem } from "@/lib/database/actions/cart.action";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className=" relative">
          <IoMdCart className="  bg-white rounded-full shadow p-2 w-[80%] hover:bg-primary cursor-pointer hover:text-white h-full  mr-3 text-2xl text-primary" />
          <span className=" absolute -top-1 right-0 text-sm bg-yellow-50 text-orange-500 px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="inline-flex text-lg items-center gap-2 text-primary border-b pb-2 w-full">
            <FaShoppingCart className="text-xl" />
            Your Cart
          </AlertDialogTitle>
          <div className="flex flex-col items-start justify-start gap-2 border-b py-6 ">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex w-full items-center justify-between"
              >
                <div className=" flex items-start justify-center gap-1">
                  <Image
                    src={"/heruo.png"}
                    width={100}
                    height={100}
                    className=" h-20 w-20 object-contain object-center shadow-sm"
                  />
                  <div className=" flex flex-col items-start justify-center ml-2">
                    <h1 className=" text-lg font-bold mb-2 text-primary capitalize">
                      {item.product.productName}
                    </h1>
                    <div className=" flex items-center justify-center gap-4">
                      <FaMinus
                        onClick={async () => {
                          toast.promise(updateCartItem("minus", item._id), {
                            loading: "Removing Item",
                            success: "Item removed",
                            error: "error",
                          });
                          router.refresh();
                        }}
                        className=" hover:bg-slate-50 rounded-full cursor-pointer "
                      />
                      <p className=" text-sm font-light text-slate-600">
                        Qty:{" "}
                        <span className=" font-bold text-lg">
                          {" "}
                          {item.quantity}
                        </span>
                      </p>
                      <FaPlus
                        onClick={async () => {
                          toast.promise(updateCartItem("add", item._id), {
                            loading: "Adding Item",
                            success: "Item Added",
                            error: "error",
                          });
                          router.refresh();
                        }}
                        className=" cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className=" font-bold text-xl text-primary">
                    Rs {item.product.price}/-
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AlertDialogHeader>
        <div className=" flex flex-col w-full items-center justify-between mb-4 border-b pb-4">
          <div className="flex flex-col w-full items-start justify-start mb-2 ">
            <div className="flex w-full items-center justify-between">
              <p>Total Items: </p>
              <span className=" text-lg font-bold ml-1 ">
                0{cart.length}
              </span>{" "}
            </div>
            <div className="flex w-full items-center justify-between">
              <p className=" text-lg ">SubTotal: </p>
              <span className=" text-lg font-bold ">{totalPrice} Rs</span>{" "}
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>
              <Link href={"/e-shop/checkout"}>Checkout</Link>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Cart;
