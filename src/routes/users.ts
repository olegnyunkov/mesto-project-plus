import { Router } from 'express';
import {
  getUserId, getUsers, updateAvatar, updateProfile, getProfile,
} from '../controllers/users';
import { updateAvatarValidation, updateProfileValidation } from '../utils/validation';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserId);
userRouter.get('/users/me', getProfile);
userRouter.patch('/users/me', updateProfileValidation, updateProfile);
userRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);
