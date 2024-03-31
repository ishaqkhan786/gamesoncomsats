import AddEquiment from '@/components/shared/AddEquiment'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getEquipments } from '@/lib/database/actions/equipment.actions'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import BookEquipment from '@/components/shared/BookEquipment'
import Link from 'next/link';
import { MdAdd } from "react-icons/md";
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
import EquipmentCharts from '@/components/shared/EquipmentCharts'

const page = async () => {
  const equipments = await getEquipments();
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const userId = session.user.id.toString();
  return (
    <div className='wrapper flex flex-col items-start justify-start w-full h-full  overscroll-y-scroll '>
      {
        session.user && session.user.role === "admin" ? (
          <div className='flex flex-col items-start justify-center w-full mr-5 p-6 rounded-md bg-blue-50 pb-10 '>
            <div className='flex items-center justify-between w-full py-2 '>

              <h2 className='text-2xl font-bold text-primary-500'>Inventory Dashboard</h2>
              <AlertDialog>
                <AlertDialogTrigger className=' py-2 inline-flex items-center text-sm mt-2 bg-primary px-4 rounded-md text-white'><MdAdd className='text-xl mr-1' />
                  Add Equipment </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AddEquiment />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <EquipmentCharts data={equipments} />
          </div>
        ) : (
          <div className=' w-full p-4 flex-col flex items-center justify-center gap-4  '>

            <h2 className='font-bold text-3xl capitalize text-primary self-center mb-6 pb-2 px-4  shadow '>
              Sports Equipments
            </h2>
            {
              equipments.length === 0 && (<p className=' flex items-center justify-center w-full pb-5 text-primary font-semibold '>No Equipment Added</p>)
            }
            <div className=' grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 '>
              {
                equipments.map((item) => (
                  <div key={item._id} className='flex flex-col items-center justify-center bg-white   shadow-lg p-4 rounded-md mb-8'>
                    <h3 className='text-xl font-semibold capitalize'>
                      {item.name}
                    </h3>
                    <Separator className='my-3' />
                    <div className='flex items-center justify-around gap-4'>
                      <div className='flex flex-col gap-1 '>
                      {session.user && session.user.role === "admin" &&
                        <p className='font-light text-sm'>

                      
                          Total Qty: <span className='font-semibold text-primary'>{item.totalQuantity}</span>
                        </p> }
                        <p className='font-light text-sm'>
                          Available Qty: <span className='font-semibold text-primary'>{item.availableQuantity}</span>
                        </p>
                      </div>

                      <div className='text-center'>
                        <p className='text-sm'>Sports Type</p>
                        <span className='font-bold text-primary capitalize'>{item.sportsType}</span>
                      </div>

                    </div>

                    <BookEquipment bookerId={userId} itemId={item._id} />

                  </div>))
              }

            </div>
          </div>
        )


      }



    </div>
  )
}

export default page
