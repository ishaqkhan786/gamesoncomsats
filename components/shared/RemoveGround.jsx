"use client"

import React from 'react'
import { Button } from '../ui/button';
import { removeGround } from '@/lib/database/actions/ground.actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const RemoveGround = ({id}) => {
    const router = useRouter();
  return (
    <Button className="mt-4 bg-red-500 px-4 py-0.5 text-sm rounded-md text-white"
                        onClick={async()=>{
                            console.log('deleted');
                            await removeGround(id);
                            router.refresh();
                            // toast.success('ground removed');
                        }}
                        >Remove Ground</Button>
  )
}

export default RemoveGround