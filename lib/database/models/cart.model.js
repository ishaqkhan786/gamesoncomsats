import { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId, ref:"Product", required:true,
    },
    user: {
        type:Schema.Types.ObjectId, ref:"User", required:true,
    },
    quantity: {
        type: Number,
        required: true,
        default:1,
    }
 
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;
