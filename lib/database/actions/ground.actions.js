"use server"

import Ground from "../models/ground.model";
import { connectToDatabase } from "../index";


export const addGround = async (groundData) => {
    try {
        await connectToDatabase();
        const existingGround = await Ground.findOne({ name: groundData.name });
        if (existingGround) {
            throw new Error("Ground Already Added")
        }
        const ground = await Ground.create(groundData);

        return JSON.parse(JSON.stringify(ground))
    } catch (error) {
        console.log(error);
    }

}

export const getGrounds = async () => {
    try {
        await connectToDatabase();
        const grounds = await Ground.find();
        return JSON.parse(JSON.stringify(grounds));


    } catch (error) {
        console.log(error);
    }
}

export const createGroundBooking = async (bookingData, groundId, slotNumber) => {
    try {
        await connectToDatabase();
        const ground = await Ground.findOne({ _id: groundId })
        if (!ground) {
            throw new Error('no ground found');
        }

        const timeSlot = ground.timeSchedule.find(slot => slot.slotNumber === slotNumber);
        if (!timeSlot) {
            throw new Error("Time slot not found");
        }

        if (timeSlot.status !== "Available") {
            throw new Error("Time slot is not available for booking");
        }

        timeSlot.status = "Booked";
        timeSlot.bookings = bookingData;

        await ground.save();


        return JSON.parse(JSON.stringify(ground))
    }
    catch (e) {
        console.log(e)
        return { message: e.message }
    }
}

export const getGroundtBookingDetails = async (id) => {
    try {
        await connectToDatabase()
        const booking = await Ground.findOne({ _id: id })
            .populate({
                path: 'timeSchedule.bookings.bookerId',
                model: 'User',
            })
        return JSON.parse(JSON.stringify(booking))
    }
    catch (e) {
        console.log(e)
    }
}

export const removeGroundBookings = async (groundId, slotNumber) => {
    try {
        await connectToDatabase();
        const ground = await Ground.findById(groundId);
        if (!ground) {
            throw new Error('no ground found');
        }
        const timeSlot = ground.timeSchedule.find(slot => slot.slotNumber === slotNumber);
        if (!timeSlot) {
            throw new Error("Time slot not found");
        }

        if (timeSlot.status === "Available") {
            throw new Error("Time slot is already available for booking");
        }

        timeSlot.status = "Available";
        delete timeSlot.bookings;

        await ground.save();
        return JSON.parse(JSON.stringify(ground))

    } catch (error) {
        console.log(error);
    }
}