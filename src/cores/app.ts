import express from "express";
import dotenv from "dotenv";
import apiRouter from "../routers/api";

dotenv.config();
export const app = express();
const port = process.env.EXPRESS_PORT;
app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.use(express.json());
app.use(apiRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});