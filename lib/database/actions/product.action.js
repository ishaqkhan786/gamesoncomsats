"use server"
import Product from '../models/product.model';
import { connectToDatabase } from "@/lib/database";

export const addProduct = async(productData) => {
 
    try {
        await connectToDatabase();
        const isAlreadyAdded = await Product.findOne({ productName: productData.productName });
        if (isAlreadyAdded)
        {
            throw new Error('item already added');
        }
        const product = await Product.create(productData);

        return JSON.parse(JSON.stringify(product));
        
    } catch (error) {
        console.log(error);
        return {message:error.message, status:401};   

    }
}

export const getAllProducts = async() => {
 
    try {
        await connectToDatabase();

        const products = await Product.find();
        return JSON.parse(JSON.stringify(products));

        
    } catch (error) {
     console.log(error);
    }
}

export const  getProductDetails = async (id) => {
    try {
        await connectToDatabase();

        const product = await Product.findById(id);

        return JSON.parse(JSON.stringify(product));
         
    } catch (error) {
        console.log(error);
    }
}