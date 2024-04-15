"use client";

import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

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
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function ProfileForm() {
  const router = useRouter();
  const session = useSession();

  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ishaq1415@gmail.com",
      password: "ishaq1415",
    },
  });

  async function onSubmit(values) {
    setValidation("");

    const { email, password } = values;

    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(response);
    if (response?.ok) {
      router.push("/");
      toast.success("Login successful!");
    }
    if (response?.error) {
      setValidation(response.error);
    }
  }

  return (
    <>
      <div className=" absolute p-8 left-0 top-0">
        <button className="hover:bg-blue-100 rounded-full p-2">
          <Link href="/">
            <FaArrowLeft className="text-primary-500 text-lg " />
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-center shadow-md my-6  bg-gray-800 max-h-[80%]  overflow-hidden  w-full rounded">
        <Image
          src={"/pingpong.jpg"}
          alt="ping"
          width={340}
          height={100}
          className="  object-center object-fill hidden md:block "
        />
        <div className=" h-full">
          <Form {...form}>
            <div
              id="first"
              className="flex flex-col items-center h-full bg-white shadow-md w-[18rem] sm:w-[24rem]  px-8 pt-12 pb-20  space-y-7"
            >
              {/* <h2 className="text-2xl font-bold text-primary">
                Game on Comsats
              </h2> */}
              <Image src={"/comsats.png"} alt="logo" width={100} height={50} />
              <Separator />
              <form
                id="container"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block text-gray-700 font-bold mb-2">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block text-gray-700 font-bold mb-2">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
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
                    className="bg-primary-500 hover:bg-primary mt-3 text-white font-semibold py-2 px-14 rounded-full  focus:outline-none focus:shadow-outline"
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
                      <span>Login</span>
                    )}
                  </Button>
                  <p className="text-xs font-thin mt-2">
                    Didn't have an account?
                    <Link
                      className="font-semibold text-primary-500"
                      href={"/signup"}
                    >
                      {" "}
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
