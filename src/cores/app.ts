import express, { Express } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import apiRouter from "../routers/api";

dotenv.config();

export const app: Express = express();
const port: string | undefined = process.env.EXPRESS_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(apiRouter);

app.listen(port, () => {
  return console.log(`Express is listening at port ${port}`);
});
