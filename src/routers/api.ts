import express from "express";
import { premiumAlbumRouter } from "./premium-album-router";
import { authRouter } from "./auth-router";
import {subscriptionRouter} from "./subscription-router";

const apiRouter = express.Router();

apiRouter.use(premiumAlbumRouter);
apiRouter.use(authRouter);
apiRouter.use(subscriptionRouter);

export default apiRouter;
