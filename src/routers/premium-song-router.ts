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
    uploadSong.any(),
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
