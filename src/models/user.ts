import mongoose, { Schema, model } from "mongoose";
import {User} from "../types/model-types";

const userSchema = new Schema({
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

export default mongoose.model<User>("user", userSchema)
