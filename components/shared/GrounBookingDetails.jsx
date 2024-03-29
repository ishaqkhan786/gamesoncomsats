'use client'
import React from 'react'
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
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import { removeGroundBookings } from '@/lib/database/actions/ground.actions';
import { useRouter } from 'next/navigation';

const GrounBookingDetails = ({ bookingData, groundId, slotNumber }) => {

    const router = useRouter();

    const handleClick = () => {
        toast.promise(removeGroundBookings(groundId, slotNumber),
            {
                success: 'Booking Removed',
                loading: 'Removig Booking',
                error: 'Booking not removed'
            })

        router.refresh();

    }

    return (
        <>
            {
                bookingData &&
                <AlertDialog>
                    <AlertDialogTrigger className=' py-2 text-sm mt-2 bg-primary px-4 rounded-md text-white'>Check Detail</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-2xl font-bold'>Booking Details</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className='flex flex-col items-center justify-center mb-3'>
                                    <h2 className='my-2 text-slate-600 capitalize text-lg font-semibold'>
                                        Name: {bookingData.bookerId.username}
                                    </h2>
                                    <h2 className='my-2 text-slate-600 capitalize text-lg font-semibold'>
                                        Phone Number: {bookingData.phoneNumber}
                                    </h2>
                                    <h2 className='my-2 text-slate-600 capitalize text-lg font-semibold'>
                                        Reg Number: {bookingData.registraionNumber}
                                    </h2>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close detail</AlertDialogCancel>
                            <Button onClick={handleClick}>Mark as available</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            } </>


    )
}

export default GrounBookingDetails
