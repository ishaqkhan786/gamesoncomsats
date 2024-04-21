"use client";

import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import {
  addProduct,
  updateProduct,
} from "@/lib/database/actions/product.action";
import { FileUploader } from "@/components/shared/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";

const page = ({ type, product, prodId }) => {
  console.log(product);
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const { startUpload } = useUploadThing("imageUploader");

  const formSchema = z.object({
    productName: z.string().min(3, "Please enter product title"),
    description: z
      .string()
      .min(3, "Please add description")
      .max(500, "Description should not exceed 500 words"),
    imageurl: z.string(),
    price: z.coerce.number().int().gte(1, "please add ptice"),
    totalQuantity: z.coerce.number().int().gte(1, " please add total quantity"),
  });

  const initialData =
    product && type === "update"
      ? {
          ...product,
        }
      : {
          productName: "",
          imageUrl: "",
          price: 0,
          totalQuantity: 0,
          description: "",
          imageurl: "",
        };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values) {
    setValidation("");
    setLoading(true);

    let uploadedImageUrl = values.imageurl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const data = {
      ...values,
      imageurl: uploadedImageUrl,
    };
    if (type === "add") {
      const res = await addProduct(data);
      console.log(res);
      setLoading(false);
      if (res.message) {
        setValidation(res.message);
        return;
      }
      toast.success("Product Added");
      router.push("/e-shop");
    }
    if (type === "update") {
      const res = await updateProduct(prodId, data);
      console.log(res);
      setLoading(false);
      if (res.message) {
        setValidation(res.message);
        return;
      }
      toast.success("Product Updated");
      router.push(`/e-shop/${prodId}`);
    }
  }

  return (
    <div className="p-4">
      <div className=" flex py-6 flex-col items-start justify-start">
        <h2 className=" text-3xl font-bold">
          {type === "add" ? "Add" : "Update"} New Product
        </h2>
        <div
          id="first"
          className="flex  w-full flex-col items-center justify-center shadow   rounded-md px-4  pt-6 pb-8 mb-4 space-y-6"
        >
          <Form {...form}>
            <Separator />
            <form
              id="container"
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full"
            >
              <div className="flex items-center justify-between w-full px-2 ">
                <div className=" flex flex-col items-start justify-start w-full md:w-[55%] ">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block wf text-gray-700 font-bold mb-2">
                          Product Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Product Title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalQuantity"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          Total Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" w-full md:w-[40%]">
                  <FormField
                    control={form.control}
                    name="imageurl"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="h-72">
                          <FileUploader
                            onFieldChange={field.onChange}
                            imageUrl={field.value}
                            setFiles={setFiles}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-gray-700 font-bold mb-2">
                      description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {/* <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      /> */}
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-red-400 font-semibold">
                      {validation}
                    </p>
                  </FormItem>
                )}
              />

              <div className="flex flex-col w-full items-center justify-center">
                <Button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary mt-3 text-white font-semibold py-2 px-6 rounded-md  focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                      ]}
                    />
                  ) : (
                    <span>{type === "update" ? "update" : "add"} Product</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
