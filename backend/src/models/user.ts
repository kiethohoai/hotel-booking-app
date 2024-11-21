import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Type
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// userSchema
const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
});

/* Hash password before save to DB (middleware) */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 8);
  }
  next();
});

// User MODEL
const User = mongoose.model<UserType>("User", userSchema);
export default User;
