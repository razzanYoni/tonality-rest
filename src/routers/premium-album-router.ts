import express from "express";
import * as PremiumAlbumController from "../controllers/premium-album-controller";

const premiumAlbumRouter = express.Router();

premiumAlbumRouter.post("/api/premium-album", PremiumAlbumController.createPremiumAlbum);

premiumAlbumRouter.get("/api/premium-albums", PremiumAlbumController.searchPremiumAlbum);

premiumAlbumRouter.patch("/api/premium-album/:premiumAlbumId", PremiumAlbumController.updatePremiumAlbum);

premiumAlbumRouter.delete(
  "/api/premium-album/:premiumAlbumId",
  PremiumAlbumController.deletePremiumAlbum,
);

export default premiumAlbumRouter;
