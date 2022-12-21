import {Request, Response} from "express";
import card from "../models/card";
import {ObjectId} from "mongoose";
import {DEFAULT_ERROR, NOT_FOUND, WRONG_DATA} from "../utils/response-errors";

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((info) => res.send({info}))
    .catch(() => res.status(DEFAULT_ERROR).send("Ошибка сервера"))
};

export const createCard = (req: Request, res: Response) => {
  const id = req.user?._id;
  const { name, link } = req.body;
  card.create({ name, link, owner: id })
    .then((info) => res.status(201).send({info}))
    .catch(() => {
      if(!name || !link) {
        res.status(WRONG_DATA).send("Переданы некорректные данные при создании карточки")
      } else {
        res.status(DEFAULT_ERROR).send("Ошибка сервера")
      }
    })
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  card.deleteOne({cardId})
    .then((info) => res.send({info}))
    .catch(() => {
      if(!cardId) {
        res.status(WRONG_DATA).send("Переданы некорректные данные для удаления карточки")
      } else {
        res.status(DEFAULT_ERROR).send("Ошибка сервера")
      }
    })
};

export const likeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((info) => res.send({info}))
    .catch(() => {
      if(!req.params.cardId) {
        res.status(NOT_FOUND).send("Пользователь не найден")
      } else {
        res.status(DEFAULT_ERROR).send("Ошибка сервера")
      }
    })
};

export const dislikeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id as ObjectId } },
    { new: true },
  )
    .then((info) => res.send({info}))
    .catch(() => {
      if(!req.params.cardId) {
        res.status(NOT_FOUND).send("Пользователь не найден")
      } else {
        res.status(DEFAULT_ERROR).send("Ошибка сервера")
      }
    })
}