import { Request, Response } from 'express';
import user from '../models/user';
import { DEFAULT_ERROR, WRONG_DATA } from '../utils/response-errors';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((info) => res.status(201).send({ info }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then((info) => res.send({ info }))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' }));
};

export const getUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  user.findById(userId)
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const updateProfile = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  user.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные для обновления пользователя' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  user.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((info) => res.send({ info }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные для обновления аватара' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
