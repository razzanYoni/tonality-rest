import express from "express";
import {
  createPremAlbum,
  getAllPremAlbum,
  updatePremAlbum,
  deletePremAlbum,
} from "../controllers/premium-album-controller";

const premiumAlbumRouter = express.Router();

// create
premiumAlbumRouter.post("/api/premium-album", createPremAlbum);

// read
premiumAlbumRouter.get("/api/premium-albums", getAllPremAlbum);

// update
premiumAlbumRouter.patch("/api/premium-album/:premiumAlbumId", updatePremAlbum);

// delete
premiumAlbumRouter.delete("/api/premium-album/:premiumAlbumId", deletePremAlbum);

export default premiumAlbumRouter;
