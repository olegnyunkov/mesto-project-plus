//@ts-nocheck
import {Request, Response} from "express";
import card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
};

export const createCard = (req: Request, res: Response) => {
  const id = req.user?._id;
  const { name, link } = req.body;
  card.create({ name, link, owner: id })
    .then((info) => res.status(201).send({info}))
    .catch((err) => console.log(err))
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  card.deleteOne({cardId})
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
};

export const likeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
};

export const dislikeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((info) => res.send({info}))
    .catch((err) => console.log(err))
}