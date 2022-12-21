import { Router } from 'express';
import {
  createUser, getUserId, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserId);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);
