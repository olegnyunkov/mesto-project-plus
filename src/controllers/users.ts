import {Request, Response} from "express";
import user from "../models/user";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((info) => res.status(201).send({info}))
    .catch((err) => console.log(err))
}

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
}

export const getUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  user.findById(userId)
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
}

export const updateProfile = (req: Request, res: Response) => {
  const id = req.user?._id;
  const { name, about } = req.body;
  user.findByIdAndUpdate(id, name, about)
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
}

export const updateAvatar = (req: Request, res: Response) => {
  const id = req.user?._id;
  const { avatar } = req.body;
  user.findByIdAndUpdate(id, avatar)
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
}