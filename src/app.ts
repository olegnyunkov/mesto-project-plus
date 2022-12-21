import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users";
import { fakeAuth } from "./middlewares/authorization";
import { cardRouter } from "./routes/cards";

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fakeAuth);
app.use(userRouter);
app.use(cardRouter);


app.listen(PORT, () => {
  console.log("server started");
});
