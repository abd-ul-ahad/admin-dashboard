import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 100,
    },
    email: {
      type: String,
      unique: true,

      required: true,
    },
    password: { type: String, minLength: 6, required: true },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
