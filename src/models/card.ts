import mongoose, {Schema, model, Types} from "mongoose";
import {Card} from "../types/model-types";

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    required: true
  },
  likes: {
    type: Types.ObjectId,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model<Card>("card", cardSchema)

