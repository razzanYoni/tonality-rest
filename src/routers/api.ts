import express from "express";
import { premiumAlbumRouter } from "./premium-album-router";
import { authRouter } from "./auth-router";

const apiRouter = express.Router();

apiRouter.use(premiumAlbumRouter);
apiRouter.use(authRouter);

export default apiRouter;
