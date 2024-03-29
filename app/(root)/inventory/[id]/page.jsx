import { getEquipmentBookingDetails } from '@/lib/database/actions/equipment.actions'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const page = async({
  params: { id },
}) => {

  const equipmentData = await getEquipmentBookingDetails(id);
  console.log(equipmentData);
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
  const options = { 
    month: 'short', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleString('en-US', options);  };
  return (
    <div>
      <Table>
        {
          equipmentData.booking.length > 0 ? (  <TableCaption>All Bookings for {equipmentData.name}</TableCaption>
) :   <TableCaption>No Bookings for {equipmentData.name}</TableCaption>

        }
  <TableHeader>
    <TableRow >
      <TableHead className="w-[100px]">S.no</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Reg No</TableHead>
      <TableHead>Phone No</TableHead>
      <TableHead className="text-center">Time</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      equipmentData.booking.map((bookingData,index)=>(
        <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{bookingData.bookerId.username}</TableCell>
      <TableCell>{bookingData.registraionNumber}</TableCell>
      <TableCell>{bookingData.phoneNumber}</TableCell>
      <TableCell className="text-right">{formatTime(bookingData.createdAt)}</TableCell>
    </TableRow>
      ))
    }
    
  </TableBody>
</Table>

    </div>
  )
}

export default page
