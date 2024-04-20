"use server"

import { connectToDatabase } from ".."
import Cart from "../models/cart.model";

export const createNewCart = async (data) =>
{
     try {
         await connectToDatabase();
         const existingCartItem = await Cart.findOne({ user: data.user, product: data.product })
         if (existingCartItem)
         {
             existingCartItem.quantity++;
             const cart = await existingCartItem.save();
              return JSON.parse(JSON.stringify(cart))

         }
         else {
             const cart = await Cart.create(data);
                      return JSON.parse(JSON.stringify(cart))

         }

     } catch (error) {
        console.log(error);
     }
}

export const getCartItems = async (userId) =>
{
    try {
        await connectToDatabase();

        const cart = await Cart.find({ user: userId }).populate('product');
        return JSON.parse(JSON.stringify(cart))
 
    } catch (error) {
        console.log(error);
    }
}

export const updateCartItem = async (operator,id) =>
{
    try {
        await connectToDatabase();
        const item = await Cart.findById(id);
        if (operator === 'add')
        {
            item.quantity++;
            await item.save();
        }
        else {
            item.quantity--;
            await item.save();
        }
        return JSON.parse(JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }

}