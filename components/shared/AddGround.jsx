"use client"
import React from 'react'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
import { addGround } from '@/lib/database/actions/ground.actions';

const AddGround = () => {

  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(3,
      "Please add a name",
    ),
    sportsType: z.string().min(3,
      "Please specify the sports type",
    ),
    timeAllowed: z.string().min(1, "Add Quantity")
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "cricket ground",
      timeAllowed: "1",
      sportsType: "cricket"
    },
  });
  async function onSubmit(values) {
    console.log(values);
    const res = await toast.promise(addGround(values),
      {
        success: "Ground Added",
        loading: 'Adding Ground',
        error: "Error Adding Ground"
      })
    console.log(res)
    if (res.status && res.status === 401) {
      setValidation("Ground Already Added");
    }
    else {
      router.refresh()
    }

  }
  return (
    <div className='flex flex-col w-full items-center justify-center rounded-lg p-6'>

      <Form {...form}>
        <div
          id="first"
          className="flex flex-col items-center bg-white w-[24rem] sm:w-[24rem]  rounded-xl px-8 pt-6 pb-8 mb-4 space-y-6"
        >
          <h1 className='text-2xl font-bold'>
            Add Playground
          </h1>
          <Separator />
          <form
            id="container"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Playground Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="equipment"
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
              name="sportsType"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Sports Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="cricker"
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
              name="timeAllowed"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Time Allowed (hours)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00"
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
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
                  <span>Add Playground</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}

export default AddGround
