import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String },
    role:{type:String, required:true},
    googleId: String,
    googleEmail: String,
    googleDisplayName: String,
    googlePhoto: String,
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const User = models.User || model("User", UserSchema);

export default User;
