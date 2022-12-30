import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { createCardValidation, idValidation } from '../utils/validation';

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCardValidation, createCard);
cardRouter.delete('/cards/:cardId', idValidation, deleteCard);
cardRouter.put('/cards/:cardId/likes', idValidation, likeCard);
cardRouter.delete('/cards/:cardId/likes', idValidation, dislikeCard);

export default cardRouter;
