import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import card from '../models/card';
import { IExtendedRequestId } from '../types/model-types';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  card.find({})
    .then((info) => res.send({ info }))
    .catch(next);
};

export const createCard = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  const id = req.user && req.user._id;
  const { name, link } = req.body;
  card.create({ name, link, owner: id })
    .then((info) => res.status(201).send({ info }))
    .catch(next);
};

export const deleteCard = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
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
    .catch(next);
};

export const likeCard = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user && req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};

export const dislikeCard = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user && req.user._id as ObjectId } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};
