import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "required username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "required email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "required password"],
  },
  verifyToken:{ type:String},
  verifyTokenExpiry:{ type:String},
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: { type: Boolean, default: false},
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
