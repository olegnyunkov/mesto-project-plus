import { Router } from "express";
import {getCards, createCard, deleteCard, likeCard, dislikeCard} from "../controllers/cards";

export const cardRouter = Router();

cardRouter.get("/cards", getCards);
cardRouter.post("/cards", createCard);
cardRouter.delete("/cards/:cardId", deleteCard);
cardRouter.put("/cards/:cardId/likes", likeCard);
cardRouter.delete("/cards/:cardId/likes", dislikeCard);