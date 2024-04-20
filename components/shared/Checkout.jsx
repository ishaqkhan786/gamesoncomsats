"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa";
import AddAddress from "@/components/shared/AddAddress";
import Cart from "./Cart";
import toast from "react-hot-toast";
import { createNewOrder } from "@/lib/database/actions/order.action";
import { useRouter } from "next/navigation";
import { delteCartofUser } from "@/lib/database/actions/cart.action";
const Checkout = ({ cart, userDetails, userId }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAddress, setselectedAddress] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");

  const router = useRouter();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const placeOrder = async () => {
    const data = {
      totalAmount: totalPrice,
      totalQuantity: cart.length,
      items: [...cart], // Extracting only the _id fields
      user: userId,
      selectedAddress,
      paymentMethod,
    };
    console.log(data);
    await delteCartofUser(userId);
    toast.promise(createNewOrder(data), {
      loading: "Placing Order",
      success: "Order Placed",
      error: "error",
    });
    router.replace("/e-shop/checkout/success");
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center p-5 px-6 md:px-10">
      <div className=" bg-blue-50 w-full flex flex-col items-start justify-start p-4 shadow-sm ">
        <div className=" flex items-center justify-between w-full border-b pb-4">
          <h1 className=" text-2xl md:text-3xl text-primary font-bold  pb-3  mt-2 ">
            Cart Checkout
          </h1>
          <Cart cart={cart} />
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-evenly w-full">
          <div>
            <div className=" my-4">
              <p className=" text-xl font-semibold text-slate-700">
                Please select address for shipment
              </p>
              <RadioGroup
                defaultValue="option-one"
                onValueChange={(v) => {
                  setselectedAddress(v);
                }}
                className="mt-2"
              >
                {" "}
                {userDetails.address.map((adr, index) => (
                  <div
                    key={index}
                    className="flex bg-white p-3 rounded-md px-4 pr-12 shadow items-center my-1 space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem value={adr} id={adr} />
                    <Label
                      htmlFor={adr}
                      className="cursor-pointer text-slate-600 inline-flex items-center"
                    >
                      {adr}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <AddAddress id={userId} />
            </div>
            <div className=" mt-8 mb-4">
              <h1 className=" font-bold text-2xl mb-0.5 ">Payment Method</h1>
              <p className=" font-semibold text-slate-500 mb-4">
                Please select/add the method you want to pay with.
              </p>

              <RadioGroup
                defaultValue="option-one"
                onValueChange={(v) => {
                  setpaymentMethod(v);
                  console.log(paymentMethod);
                }}
              >
                <div className="flex items-center my-1 space-x-2 cursor-pointer">
                  <RadioGroupItem value="cash" id="option-one" />
                  <Label
                    htmlFor="option-one"
                    className="cursor-pointer inline-flex items-center"
                  >
                    Cash on delivery
                    <TbTruckDelivery className=" text-primary text-2xl ml-2" />
                  </Label>
                </div>
                <div className="flex items-center my-1 space-x-2 cursor-pointer">
                  <RadioGroupItem value="card" id="option-two" />
                  <Label
                    htmlFor="option-two"
                    className="cursor-pointer inline-flex items-center"
                  >
                    Card payment
                    <FaCreditCard className=" text-primary text-xl ml-2" />
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className=" flex items-center justify-center font-mono text-slate-600 ">
            <div className="  bg-gray-50 p-3 rounded-sm ">
              <div className="flex flex-col items-center py-2 px-6 w-60 md:w-80  rounded-md justify-center border-2 border-dotted border-slate-300 ">
                <h1 className=" w-[90%] text-center border-b font-bold pb-2">
                  Order reciept
                </h1>
                <div className=" flex items-center justify-between w-full my-1 mt-3">
                  <p className=" font-semibold">Total Items:</p>
                  <span>{cart.length} Items</span>
                </div>
                <div className=" flex items-center justify-between w-full my-1">
                  <p className=" font-semibold">Total Amount:</p>
                  <span>{totalPrice} Rs</span>
                </div>
                <div className=" flex items-center justify-between w-full my-1">
                  <p className=" font-semibold">Payment method:</p>
                  <span className="capitalize">
                    {paymentMethod === "" ? "none selected" : paymentMethod}
                  </span>
                </div>
                <div className=" flex flex-col items-start justify-start w-full my-1 mb-4 border-b pb-4">
                  <p className=" font-semibold capitalize">Address:</p>
                  <span className="capitalize text-sm">
                    {selectedAddress === "" ? "none selected" : selectedAddress}
                  </span>
                </div>
                <Button
                  onClick={placeOrder}
                  disabled={selectedAddress === "" && paymentMethod === ""}
                  className=" bg-slate-200 text-slate-600 mb-6 hover:bg-slate-300 hover:text-slate-700"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
