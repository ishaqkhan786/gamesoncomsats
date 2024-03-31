"use server"
import Equipment from '../models/equipment.model';
import { connectToDatabase } from "@/lib/database";

export const addEquipment = async (equipmentData) => {
    try {
        await connectToDatabase();
        const existingEquipment = await Equipment.findOne({ name: equipmentData.name });
        if (existingEquipment) {
           throw new Error("Item Already Added") 
        }
        const newEquipment = await Equipment.create(equipmentData)
        // await newEquipment.save();
        return JSON.parse(JSON.stringify(newEquipment));
    } catch (error) {
        console.error("Error adding equipment:", error);
        return {message:error.message, status:401};
    }
}

export const getEquipments = async () =>
{
    try{
        await connectToDatabase();
        const equipments = await Equipment.find().populate({
      path: 'booking.bookerId',
      model: 'User',
    });
        return JSON.parse(JSON.stringify(equipments));
    }
    catch(error)
    {
     console.error("Error getting equipments:", error);
        return {message:error.message, status:401};   
    }
}

export const getEquipmentBookingDetails = async (id) =>
{
    try{
        await connectToDatabase()
        const booking = await Equipment.findOne({_id: id}).populate({
      path: 'booking.bookerId',
      model: 'User',
    })
        return JSON.parse(JSON.stringify(booking))
    }
    catch(e)
    {
        console.log(e)
    }
}

export const createBooking = async(bookingData,id) =>
{
    try{
        await connectToDatabase();
        const item = await Equipment.findOne({ _id: id})
        if(!item)
        {
            throw new Error('no item found');
        }
        const newBooking = {
          bookerId: bookingData.bookerId,
          registraionNumber: bookingData.registrationNumber,
          phoneNumber: bookingData.phoneNumber,
      // Add other necessary details for the booking
        };
        await item.booking.push(newBooking)
         item.bookedQuantity = item.booking.length;
        item.availableQuantity = item.totalQuantity - item.bookedQuantity;

        await item.save();

        return JSON.parse(JSON.stringify(item))
    }
    catch(e)
    {
        console.log(e)
        return {message:e.message}
    }
}

export const removeEquipment = async(eqpId) =>
{
    try {
        await connectToDatabase();
        const equipment = await Equipment.findByIdAndDelete(eqpId);
        if(!equipment)
        {
            throw new Error('equipment not found');
        }
        return JSON.parse(JSON.stringify(equipment));
    } catch (error) {
        console.log(error);
    }
}