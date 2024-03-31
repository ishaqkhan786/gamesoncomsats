import AddGround from '@/components/shared/AddGround'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getgrounds } from '@/lib/database/actions/equipment.actions'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getGrounds } from '@/lib/database/actions/ground.actions'
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
import { MdAdd } from 'react-icons/md'
import RemoveGround from '@/components/shared/RemoveGround'
const page = async () => {


  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const grounds = await getGrounds();

  return (
    <div className='wrapper flex flex-col items-start justify-start w-full h-full  overscroll-y-scroll '>

      {
        session.user && session.user.role === "admin" &&
        <div className='flex items-center justify-between w-full py-2 '>

          <h2 className='text-2xl font-bold text-primary-500'>Playgrounds  Dashboard</h2>
          <AlertDialog>
            <AlertDialogTrigger className=' py-2 inline-flex items-center text-sm mt-2 bg-primary px-4 rounded-md text-white'><MdAdd className='text-xl mr-1' />
              Add Playground </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AddGround />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      }


      {
        session.user && session.user.role !== "admin" && <h2 className='font-bold text-3xl capitalize text-primary self-center pb-3 px-4 border-b   '>
          Sports grounds
        </h2>
      }
      {
        grounds.length && grounds.length === 0 && (<p className=' flex items-center justify-center w-full pb-5 text-primary font-semibold '>No Playgrounds Added</p>)
      }
      <div className=' grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 mt-6 '>
        {
          grounds.length && grounds.map((ground) => {
            let availableSlots = 0;
            let bookedSlots = 0;

            // Count available and booked slots
            ground.timeSchedule.forEach((slot) => {
              if (slot.status === 'Available') {
                availableSlots++;
              } else {
                bookedSlots++;
              }
            });
            return (
              <div key={ground._id} className='flex flex-col items-center justify-center bg-white   shadow-lg p-4 rounded-2xl mb-8'>
                <h3 className='text-xl font-semibold capitalize'>
                  {ground.name}
                </h3>
                <span className='font-bold text-sm text-primary  capitalize'>{ground.sportsType}</span>
                <Separator className='my-3' />
                <div className='flex items-center justify-around gap-4'>
                  <div className='flex flex-col gap-1 '>
                    <p className='font-light text-sm'>
                      Booking Time: <span className='font-semibold text-primary'>{ground.timeAllowed} hour</span>
                    </p>
                    <p className='font-light text-sm'>

                      Available Slots: <span className='font-semibold text-primary'>{availableSlots} slots</span>
                    </p>
                    <p className='font-light text-sm'>

                      Booked Slots: <span className='font-semibold text-primary'>{bookedSlots} slots</span>
                    </p>
                  </div>



                </div>

                <Link href={`/ground/${ground._id}`} className="mt-4 bg-primary px-4 py-2 text-sm rounded-md text-white" varient="sm">
                  {
                    session.user.role === 'admin' ? 'Check Bookings' : 'Book slot'
                  }
                </Link>
                
                {
        session.user && session.user.role === "admin" && (
                <RemoveGround id={ground._id} /> )
        }


                
              </div>)
          })
        }

      </div>

    </div>
  )
}

export default page
