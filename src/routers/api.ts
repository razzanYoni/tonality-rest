import express from "express";
import { premiumAlbumRouter } from "./premium-album-router";
import { authRouter } from "./auth-router";
import {subscriptionRouter} from "./subscription-router";
import {premiumSongRouter} from "./premium-song-router";

const apiRouter = express.Router();

apiRouter.use(authRouter);
apiRouter.use(premiumAlbumRouter);
apiRouter.use(premiumSongRouter);
apiRouter.use(subscriptionRouter);

export default apiRouter;
