import express, { Router } from "express";
import * as PremiumSongController from "../controllers/premium-song-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";

const premiumSongRouter: Router = express.Router();

premiumSongRouter.post(
    "/api/premium-album/:premiumAlbumId",
    verifyToken,
    PremiumSongController.addNewSong,
    handleStandardError,
);

premiumSongRouter.get(
    "/api/premium-album/:premiumAlbumId",
    verifyToken,
    PremiumSongController.getAllSongFromAlbum,
    handleStandardError,
);

premiumSongRouter.patch(
    "/api/premium-album/:premiumAlbumId/:premiumSongId",
    verifyToken,
    PremiumSongController.updatePremiumSong,
    handleStandardError,
);

premiumSongRouter.delete(
    "/api/premium-album/:premiumAlbumId/:premiumSongId",
    verifyToken,
    PremiumSongController.deletePremiumSong,
    handleStandardError,
);

export { premiumSongRouter };
