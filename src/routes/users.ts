import { Router } from "express";
import { createUser, getUserId, getUsers } from "../controllers/users";

export const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", getUserId);
userRouter.post("/users", createUser);