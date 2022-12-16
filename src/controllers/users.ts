import {Request, Response} from "express";
import user from "../models/user";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((user) => res.status(201).send({data: user}))
    .catch((err) => console.log(err))
}

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then((info) => res.send({data: info}))
    .catch((err) => console.log(err))
}

export const getUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  user.findById(userId)
    .then((info) => res.send({data: info}))
    .catch((err) => console.log(err))
}