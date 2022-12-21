import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import card from '../models/card';
import { DEFAULT_ERROR, WRONG_DATA } from '../utils/response-errors';

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((info) => res.send({ info }))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' }));
};

export const createCard = (req: Request, res: Response) => {
  const id = req.user?._id;
  const { name, link } = req.body;
  card.create({ name, link, owner: id })
    .then((info) => res.status(201).send({ info }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные для создания карточки' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  card.deleteOne({ cardId })
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const likeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id as ObjectId } },
    { new: true },
  )
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
