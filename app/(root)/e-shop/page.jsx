import React from "react";
import Link from "next/link";
import { BiSolidCartAdd } from "react-icons/bi";
import Image from "next/image";
import { getAllProducts } from "@/lib/database/actions/product.action";
import EshopNav from "@/components/shared/EshopNav";
const page = async () => {
  const products = await getAllProducts();
  return (
    <div className=" flex flex-col items-start justify-center py-8">
      <div className=" w-[95%] mx-auto mt-7 rounded-lg py-8 shadow-md bg-blue-50 flex flex-col md:flex-row gap-4 items-center justify-evenly">
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-3xl">E-Shop</h2>
          <p className=" font-light text-lg text-slate-600 max-w-lg">
            Mangane and maintain all the products and merchendise from here.
          </p>
        </div>
        <Link
          className=" bg-primary font-semibold inline-flex items-center text-lg px-8 py-2 shadow rounded-lg text-white"
          href={"/e-shop/addProduct"}
        >
          Add new Product <BiSolidCartAdd className=" text-2xl ml-2" />
        </Link>
      </div>
      <div className=" w-full p-8 py-6">
        <EshopNav />
        <div className=" grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center justify-center gap-2 p-2 bg-cover shadow-md rounded-md   "
            >
              <Link href={`/e-shop/${product._id}`} className=" cursor-pointer">
                <Image
                  src={"/heruo.png"}
                  width={100}
                  height={100}
                  className=" object-cover w-36  my-3 h-36 object-center"
                />
              </Link>

              <h2 className=" font-semibold text-xl border-b w-full flex justify-center pb-3 ">
                {product.productName}
              </h2>
              <div className=" w-full p-1">
                <p className="font-semibold text-xs  text-slate-600 ">
                  RS{"  "}
                  <span className=" text-sm font-bold ml-1 text-primary">
                    {" "}
                    {product.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
