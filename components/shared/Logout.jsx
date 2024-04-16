"use client";
import React from "react";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logoutUser = () => {
    toast.promise(signOut(), {
      success: "logged Out",
      loading: "logging out...",
      error: "Error",
    });
    router.push("/");
  };
  return (
    <LuLogOut
      className=" hover:cursor-pointer bg-slate-50 p-1 rounded text-2xl text-slate-600"
      onClick={logoutUser}
    />
  );
};

export default Logout;
