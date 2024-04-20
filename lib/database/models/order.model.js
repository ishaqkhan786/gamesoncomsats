import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
   items: [{ type: Schema.Types.ObjectId ,ref:'Cart' , }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  selectedAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  totalAmount: Number,
  totalQuantity: Number,
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Order = models.Order || model("Order", orderSchema);

export default Order;
