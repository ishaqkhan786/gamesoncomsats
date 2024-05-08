"use client";
import React, { useRef, useState } from "react";
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
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { createBooking } from "@/lib/database/actions/equipment.actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const BookEquipment = ({ bookerId, itemId }) => {
  const idRef = useRef("");
  const phoneRef = useRef("");
  const [validation, setValidation] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (idRef.current.value === "" || phoneRef.current.value === "") {
      setValidation(true);
      return;
    }
    setValidation(false);
    const bookingData = {
      bookerId,
      registrationNumber: idRef.current.value,
      phoneNumber: phoneRef.current.value,
    };
    console.log(bookingData, itemId);
    const booking = await createBooking(bookingData, itemId);
    if (booking) {
      toast.success("Item Booked");
      // router.refresh();
      window.location.reload();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=" py-2 text-sm mt-2 bg-primary px-4 rounded-md text-white">
          Book Item
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Book Item</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the required information.
              <Separator className="my-3" />
              <p className="font-semibold mt-2 text-black">
                Registration Number
              </p>
              <Input
                placeholder="ID"
                type="text"
                ref={idRef}
                className="shadow appearance-none my-1 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="font-semibold mt-3 text-black">Contact Number</p>
              <Input
                placeholder="Ph.no"
                ref={phoneRef}
                type="text" // Change type to text
                maxLength={11} // Limit maximum length to 11 digits
                pattern="[0-9]*" // Allow only numeric characters
                className="shadow appearance-none my-1 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {validation && (
                <p className="font-semibold text-red-500 text-sm mt-2">
                  Please Fill the form
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleSubmit}>Book Item</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookEquipment;
