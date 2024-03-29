import { Schema, model, models } from "mongoose";

const bookingSchema = new Schema({
  bookerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  registraionNumber:
  {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const equipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  totalQuantity: {
    type: Number,
    default: 20,
  },
  bookedQuantity: {
    type: Number,
    default: 0,
  },
  availableQuantity: {
    type: Number,
    default: 20,
  },
  sportsType: {
    type: String,
    required: true,
  },
  booking: [bookingSchema] // Embed booking schema as an array in the equipment schema
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Equipment = models.Equipment || model("Equipment", equipmentSchema);

export default Equipment;
