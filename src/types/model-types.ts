import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type TUser = {
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

export interface IExtendedRequest extends Request {
  user?: string | JwtPayload,
}

export interface IExtendedRequestId extends Request {
  user?: { _id?: string | ObjectId },
}
