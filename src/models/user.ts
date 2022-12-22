import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { TUser } from '../types/model-types';

const userSchema = new Schema({
  _id: String,
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Неправильно указан фдрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<TUser>('user', userSchema);
