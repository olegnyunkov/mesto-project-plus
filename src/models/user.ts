import mongoose, { Schema } from "mongoose";
import {TUser} from "../types/model-types";

const userSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200
  },
  avatar: {
    type: String,
    required: true
  }
});

export default mongoose.model<TUser>("user", userSchema)
