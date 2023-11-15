import express, { Router } from "express";
import * as PremiumAlbumController from "../controllers/premium-album-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";
import {uploadCover} from "../utils/multer";

const premiumAlbumRouter: Router = express.Router();

premiumAlbumRouter.post(
  "/api/premium-album",
  verifyToken,
  uploadCover.single("coverFile"),
  PremiumAlbumController.createPremiumAlbum,
  handleStandardError
);

premiumAlbumRouter.get(
  "api/premium-album/:premiumAlbumId",
  verifyToken,
  PremiumAlbumController.getPremiumAlbumById,
  handleStandardError,
);


premiumAlbumRouter.get(
  "/api/premium-album",
  verifyToken,
  PremiumAlbumController.searchPremiumAlbum,
  handleStandardError,
);

premiumAlbumRouter.get(
  "api/premium-album-owned",
  verifyToken,
  PremiumAlbumController.searchPremiumAlbumOwned,
  handleStandardError,
)

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
