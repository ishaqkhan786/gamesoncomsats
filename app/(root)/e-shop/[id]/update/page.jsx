import React from "react";
import ProductForm from "@/components/shared/ProductForm";
import { getProductDetails } from "@/lib/database/actions/product.action";

const page = async ({ params: { id } }) => {
  const product = await getProductDetails(id);

  return <ProductForm type="update" prodId={id} product={product} />;
};

export default page;
