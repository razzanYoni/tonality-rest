import express, { Router } from "express";
import * as PremiumSongController from "../controllers/premium-song-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";
import {uploadSong} from "../utils/multer";

const premiumSongRouter: Router = express.Router();

premiumSongRouter.post(
    "/api/premium-album/:premiumAlbumId",
    verifyToken,
    uploadSong.single("audioFile"),
    PremiumSongController.addNewPremiumSong,
    handleStandardError,
);

premiumSongRouter.get(
  "/api/premium-album/:premiumAlbumId/song/:premiumSongId",
  verifyToken,
  PremiumSongController.getPremiumSongById,
  handleStandardError,
)

premiumSongRouter.get(
    "/api/premium-album/:premiumAlbumId/song",
    verifyToken,
    PremiumSongController.getAllPremiumSongFromAlbum,
    handleStandardError,
);

premiumSongRouter.patch(
    "/api/premium-album/:premiumAlbumId/song/:premiumSongId",
    verifyToken,
    uploadSong.any(),
    PremiumSongController.updatePremiumSong,
    handleStandardError,
);

premiumSongRouter.delete(
    "/api/premium-album/:premiumAlbumId/song/:premiumSongId",
    verifyToken,
    PremiumSongController.deletePremiumSong,
    handleStandardError,
);

export { premiumSongRouter };
