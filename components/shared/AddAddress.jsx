"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addUserAddress } from "@/lib/database/actions/user.actions";
import { useRouter } from "next/navigation";
const AddAddress = ({ id }) => {
  const router = useRouter();
  const [address, setaddress] = useState("");
  const [isValid, setisValid] = useState(false);
  const handleSubmit = () => {
    if (address === "") {
      setisValid(true);
    }
    toast.promise(addUserAddress(id, address), {
      loading: "adding address",
      success: "address added",
      error: "error",
    });

    setisValid(false);
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" px-6 bg-primary mt-4 text-white rounded py-2">
        Add address
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Add new address</AlertDialogTitle>
          <AlertDialogDescription>
            This address will be used as a default address for delivering your
            orders.
          </AlertDialogDescription>
          <Input
            type="text"
            placeholder="Address"
            onChange={(v) => {
              setaddress(v.target.value);
            }}
            className=" bg-slate-50 my-3 text-slate-600 font-semibold"
          />
          {isValid && (
            <p className=" text-sm font-thin text-red-600">
              please add your address
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSubmit}>Add address</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddAddress;
