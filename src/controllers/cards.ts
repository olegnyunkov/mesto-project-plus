import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import card from '../models/card';
import { DEFAULT_ERROR, NOT_FOUND, WRONG_DATA } from '../utils/response-errors';
import { IExtendedRequestId } from '../types/model-types';

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((info) => res.send({ info }))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' }));
};

export const createCard = (req: IExtendedRequestId, res: Response) => {
  const id = req.user && req.user._id;
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

export const deleteCard = (req: IExtendedRequestId, res: Response) => {
  const { cardId } = req.params;
  const id = req.user && req.user._id;
  card.findOne({ cardId })
    // .orFail(new Error('NotFound'))
    .then((info) => {
      if (!info) {
        throw new Error('Карточка не найдена');
      }
      if (info.owner.toString() !== id) {
        throw new Error('Карточка другого пользователя');
      }
      return card.deleteOne({ cardId });
    })
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const likeCard = (req: IExtendedRequestId, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user && req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const dislikeCard = (req: IExtendedRequestId, res: Response) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user && req.user._id as ObjectId } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
