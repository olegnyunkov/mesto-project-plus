import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { userRouter } from './routes/users';
import { checkAuth } from './middlewares/authorization';
import { cardRouter } from './routes/cards';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUserValidation, loginValidation } from './utils/validation';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.post('/signin', loginValidation, login);

app.post('/signup', createUserValidation, createUser);

app.use(checkAuth);
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);
app.use(errors());
// app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('server started');
});
