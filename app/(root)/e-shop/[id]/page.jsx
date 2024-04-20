import { getProductDetails } from "@/lib/database/actions/product.action";
import React from "react";
import { IoPricetag } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { BsFillHandbagFill } from "react-icons/bs";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddItemToCart from "@/components/shared/AddItemToCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async ({ params: { id } }) => {
  const product = await getProductDetails(id);
  const user = await getServerSession(authOptions);
  const userId = user.user.id.toString();
  console.log(product);
  return (
    <div className=" w-full bg-slate-50 p-6">
      <div className="flex items-start justify-evenly bg-white shadow rounded-md py-8">
        <div className=" flex flex-col items-start justify-center">
          <h1 className="text-3xl font-bold text-primary capitalize w-full border-b pb-2 ">
            {product.productName}
          </h1>
          <p className=" text-sm font-light text-slate-700 max-w-lg leading-relaxed my-3">
            {product.description} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Velit porro facere totam suscipit obcaecati
            dignissimos, cum repellendus nostrum. Iste architecto voluptas
            beatae delectus minus ea cupiditate ratione debitis voluptatem
            aliquam! Veritatis ut eligendi necessitatibus deleniti adipisci
            magni ipsum recusandae vel distinctio vitae porro id sed placeat
            repellendus fugiat, praesentium non autem optio et hic unde! Magni
            obcaecati quis corporis animi. Ducimus, nihil ex! Dolores laborum
            unde quas, eveniet facere sed nemo. Fugit vel eius quaerat
            voluptates saepe excepturi accusamus blanditiis. Id blanditiis
            maiores suscipit eum ab quo in ex hic! Aut reprehenderit dicta ullam
            aspernatur minima dolor ab, sed explicabo molestias vitae ex
            sapiente, labore, aperiam repudiandae assumenda. Illum, molestias.
            Molestiae recusandae itaque.
          </p>
          <div className=" flex flex-col md:flex-row items-center justify-center gap-4 my-6">
            <AddItemToCart userId={userId} productId={id} />

            <Button className=" font-semibold bg-white hover:text-white text-primary border-2 border-primary text-lg px-8 rounded-full py-1">
              {" "}
              <BsFillHandbagFill className=" text-xl mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
        <div className=" flex items-start justify-start flex-col gap-3 border-2 border-primary  rounded-md p-3">
          <Image
            src={"/heruo.png"}
            alt="ok"
            width={100}
            height={100}
            priority
            className=" w-72 h-72 border-b pb-6 object-contain object-center cursor-zoom-in "
          />

          <div className=" flex items-center justify-evenly w-full">
            <p className=" text-slate-600 inline-flex items-center">
              <IoPricetag className=" mr-1" />
              PKR{" "}
              <span className=" font-bold text-xl ml-2 text-primary">
                {product.price}/-
              </span>
            </p>
            <div className="border h-12 "></div>
            <p className=" font-thin text-sm text-center text-slate-600 max-w-xs mt-1">
              {product.totalQuantity} <br /> pieces avaiable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
