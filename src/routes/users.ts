import { Router } from 'express';
import {
  getUserId, getUsers, updateAvatar, updateProfile, getProfile,
} from '../controllers/users';
import { idValidation, updateAvatarValidation, updateProfileValidation } from '../utils/validation';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', idValidation, getUserId);
userRouter.get('/users/me', getProfile);
userRouter.patch('/users/me', updateProfileValidation, updateProfile);
userRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

export default userRouter;
