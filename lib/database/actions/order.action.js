"use server"

import { connectToDatabase } from ".."
import Order from "../models/order.model";

export const createNewOrder = async (data) =>
{
     try {
         await connectToDatabase();
         const order = await Order.create(data);
         return JSON.parse(JSON.stringify(order));
     } catch (error) {
        console.log(error);
     }
}

export const getAllOrders = async () =>
{
    try {
        await connectToDatabase();
        const orders = await Order.find();

        return JSON.parse(JSON.stringify(orders))
        
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersOfUSer = async (id) =>
{
    try {
        await connectToDatabase();

        const orders = await Order.find({ user: id }).populate('items');
        return JSON.parse(JSON.stringify(orders))

        
    } catch (error) {
        console.log(error);
    }
}    