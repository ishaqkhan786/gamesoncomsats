"use client";
import React from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/lib/database/actions/product.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const DeleteProduct = ({ id }) => {
  const router = useRouter();

  return (
    <p
      className=" cursor-pointer text-red-500 font-semibold"
      onClick={async () => {
        toast.promise(deleteProduct(id), {
          loading: "Deleting...",
          success: "Product Deleted",
          error: "Error deleting product",
        });
        router.push("/e-shop");
      }}
    >
      Delete
    </p>
  );
};

export default DeleteProduct;
