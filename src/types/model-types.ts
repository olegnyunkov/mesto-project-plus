import { Schema } from 'mongoose';

export type TUser = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export type TCard = {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date
}
