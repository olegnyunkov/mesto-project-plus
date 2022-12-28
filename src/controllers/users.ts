import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/user';
import { IExtendedRequestId } from '../types/model-types';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      user.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((info) => res.status(201).send({ info }))
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then((info) => res.send({ info }))
    .catch(next);
};

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  user.findById(userId)
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};

export const updateProfile = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  const id = req.user && req.user._id;
  const { name, about } = req.body;
  user.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};

export const updateAvatar = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  const id = req.user && req.user._id;
  const { avatar } = req.body;
  user.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password')
    .then((info) => {
      if (!info) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, info.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: info._id }, 'some-secret-key', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch(next);
};

export const getProfile = (req: IExtendedRequestId, res: Response, next: NextFunction) => {
  const id = req.user && req.user._id;
  user.findById({ id })
    .orFail(new Error('NotFound'))
    .then((info) => res.send({ info }))
    .catch(next);
};
