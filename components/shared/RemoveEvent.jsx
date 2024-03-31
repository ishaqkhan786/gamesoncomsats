"use client"

import React from 'react'
import { Button } from '../ui/button';
import { removeEvent } from '@/lib/database/actions/event.actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const RemoveEvent = ({id}) => {
    const router = useRouter();
  return (
    <Button className="mt-1 mb-2 bg-red-500 px-6 rounded-full py-0.5 text-sm  text-white"
                        onClick={async()=>{
                            console.log('deleted');
                            await removeEvent(id);
                            router.refresh();
                            toast.success('ground removed');
                        }}
                        >Remove Event</Button>
  )
}

export default RemoveEvent