import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "../routers/api";

dotenv.config();

export const app: Express = express();
const port: string | undefined = process.env.EXPRESS_PORT;

const allowedOrigin = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:8888',
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigin.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  credentials: true
}));

app.use(cookieParser());
app.use(apiRouter);

app.listen(port, () => {
  return console.log(`Express is listening at port ${port}`);
});
