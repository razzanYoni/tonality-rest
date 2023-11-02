import express from "express";
import * as PremiumAlbumController from "../controllers/premium-album-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";

const premiumAlbumRouter = express.Router();

premiumAlbumRouter.post(
  "/api/premium-album",
  PremiumAlbumController.createPremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.get(
  "/api/premium-albums",
  PremiumAlbumController.searchPremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.patch(
  "/api/premium-album/:premiumAlbumId",
  PremiumAlbumController.updatePremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.delete(
  "/api/premium-album/:premiumAlbumId",
  PremiumAlbumController.deletePremiumAlbum,
  handleStandardError,
);

export default premiumAlbumRouter;
