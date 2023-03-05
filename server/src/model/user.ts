
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { hashPassword , generateToken} from "../services/config";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
  generateAuthToken(): string;
}
const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = generateToken({ id: this._id, email: this.email });
  this.token = token;
  return token;
}
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await hashPassword(this.password);
    this.password = hash;
    next();
  } catch (error :any) {
    next(error);
  }
});


export default mongoose.model<IUser>("User", userSchema);
