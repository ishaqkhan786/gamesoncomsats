"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa6";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Valid Username required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string(),
});

export default function ProfileForm() {
  const router = useRouter();

  const session = useSession();
  console.log(session);
  // if (session.status === "authenticated") {
  //   router.push("/");
  // }
  const [emailValidation, setEmailValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("student");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "ishaq",
      email: "ishaq@gmail.com",
      password: "ishaq1415",
      role: "student",
    },
  });

  async function onSubmit(values) {
    setEmailValidation("");
    const { username, email, password } = values;

    setLoading(true);
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        role: userRole,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      toast.success("Signup successful!");
      router.push("/");
    }
    const data = await response.json();
    setLoading(false);
    setEmailValidation(data.message);
  }
  return (
    <>
      <div className=" absolute p-8 left-0 top-0">
        <button className="hover:bg-blue-100  rounded-full p-2">
          <Link href="/">
            <FaArrowLeft className="text-primary-500 text-lg " />
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-center  my-8  overflow-hidden  w-full rounded-md">
        <Image
          src={"/pingpong.jpg"}
          alt="ping"
          width={412}
          height={100}
          className=" object-conver h-full rounded hidden md:block "
        />
        <div className=" h-full">
          <Form {...form}>
            <div
              id="first"
              className="flex flex-col items-center rounded bg-white w-[18rem] sm:w-[26rem] mt-3 px-8 pt-6 
              pb-16 mb-2 space-y-5"
            >
              <Image src={"/comsats.png"} alt="logo" width={100} height={50} />

              <Separator />
              <form
                id="container"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block text-gray-700 font-bold mb-2">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
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
                    </FormItem>
                  )}
                />
                <p className="font-bold ml-1 mb-1 text-sm">Role</p>
                <Select onValueChange={(value) => setUserRole(value)}>
                  <SelectTrigger className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                    <SelectItem value="dptCoordinator">
                      Department Coordinator
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500 mt-4 font-semibold">
                  {emailValidation}
                </p>
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
                      <span>Sign up</span>
                    )}
                  </Button>
                  <p className="text-xs font-thin mt-2">
                    Already have an account:
                    <Link
                      className="font-semibold text-primary-500"
                      href={"/login"}
                    >
                      {" "}
                      Login
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
