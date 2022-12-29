import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IExtendedRequest } from '../types/model-types';
import { UnauthorizedError } from '../utils/response-errors';

export const checkAuth = (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { JWT_SECRET = 'super-secret-key' } = process.env;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
