import express, { Router } from "express";
import * as PremiumAlbumController from "../controllers/premium-album-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";

const premiumAlbumRouter: Router = express.Router();

premiumAlbumRouter.post(
  "/api/premium-album",
  verifyToken,
  PremiumAlbumController.createPremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.get(
  "/api/premium-albums",
  verifyToken,
  PremiumAlbumController.searchPremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.patch(
  "/api/premium-album/:premiumAlbumId",
  verifyToken,
  PremiumAlbumController.updatePremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.delete(
  "/api/premium-album/:premiumAlbumId",
  verifyToken,
  PremiumAlbumController.deletePremiumAlbum,
  handleStandardError,
);

export { premiumAlbumRouter };
