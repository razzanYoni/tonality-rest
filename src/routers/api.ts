import express from "express";
import premiumAlbumRouter from "./premium-album-router";

const apiRouter = express.Router();

apiRouter.use(premiumAlbumRouter);

export default apiRouter;