import express, { Router } from "express";
import * as PremiumAlbumController from "../controllers/premium-album-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";
import {uploadCover} from "../utils/file-processing";

const premiumAlbumRouter: Router = express.Router();

premiumAlbumRouter.post(
  "/api/premium-album",
  verifyToken,
  uploadCover.single("coverFile"),
  PremiumAlbumController.createPremiumAlbum,
  handleStandardError
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
  uploadCover.any(),
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
