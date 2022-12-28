import { Request, Response } from 'express';
import { DEFAULT_ERROR, NOT_FOUND, USER_EXISTS, WRONG_DATA } from '../utils/response-errors';

export const resError = (err: any, req: Request, res: Response) => {
  if (err.code === 11000) {
    res.status(USER_EXISTS).send({ message: 'Уже зарегистрированы' });
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(WRONG_DATA).send({ message: 'Переданы некорректные данные' });
  } else if (err.message === 'NotFound') {
    res.status(NOT_FOUND).send({ message: 'Объект не найден' });
  } else {
    res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
  }
};
