import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  totalQuantity: {
    type: Number,
    default: 50,
  },
  availableQuantity: {
    type: Number,
    default: 50,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Minimum price value
    },
  imageurl : String,
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Product = models.Product || model("Product", productSchema);

export default Product;
