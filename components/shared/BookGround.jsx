"use client"
import React, { useRef, useState } from 'react'
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
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { createBooking } from '@/lib/database/actions/equipment.actions'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { createGroundBooking } from '@/lib/database/actions/ground.actions'

const BookGround = ({ bookerId, groundId, slotNumber }) => {
  const idRef = useRef("")
  const phoneRef = useRef("")
  const [validation, setValidation] = useState(false)
  const router = useRouter();

  const handleSubmit = async () => {
    if (idRef.current.value === '' || phoneRef.current.value === '') {
      setValidation(true)
      return
    }
    setValidation(false)
    const bookingData = {
      bookerId,
      registraionNumber: idRef.current.value,
      phoneNumber: phoneRef.current.value,
    }
    console.log(groundId, slotNumber)
    console.log(bookingData);
    const booking = await createGroundBooking(bookingData, groundId, slotNumber)
    if (booking) {
      toast.success("Slot Booked")
    }
    router.refresh();

  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=' py-2 text-sm mt-2 bg-primary px-4 rounded-md text-white'>Book</AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Book Playground</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the required information.
              <Separator className="my-3" />
              <p className='font-semibold mt-2 text-black'>
                Registration Number
              </p>
              <Input
                placeholder="ID"
                type="text"
                ref={idRef}
                className="shadow appearance-none my-1 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className='font-semibold mt-3 text-black'>
                Contact Number
              </p>
              <Input
                placeholder="Ph.no"
                ref={phoneRef}
                type="number"
                className="shadow appearance-none my-1 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              {
                validation && <p className='font-semibold text-red-500 text-sm mt-2'>Please Fill the form</p>
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleSubmit} >Book Item</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default BookGround
