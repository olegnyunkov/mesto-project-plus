import { Request, Response, NextFunction } from 'express';

export const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '639cafa6f16d119722686d51',
  };

  next();
};
