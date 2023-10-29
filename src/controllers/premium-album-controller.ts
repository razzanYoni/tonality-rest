import { Request, Response } from "express";
import {
  createPremiumAlbum,
  deletePremiumAlbum,
  getAllPremiumAlbum,
  updatePremiumAlbum,
} from "../services/premium-album-service";

export async function createPremAlbum(req: Request, res: Response) {
  try {
    const data = req.body;
    console.log(data);

    const premiumAlbum = await createPremiumAlbum(data);
    res.status(200).json(premiumAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllPremAlbum(req: Request, res: Response) {
  try {
    const allPremiumAlbum = await getAllPremiumAlbum();
    res.status(200).json(allPremiumAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePremAlbum(req: Request, res: Response) {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);
    const data = req.body;

    const updatedPremiumAlbum = await updatePremiumAlbum(data, premiumAlbumId);
    res.status(200).json(updatedPremiumAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletePremAlbum(req: Request, res: Response) {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);

    const deletedPremiumAlbum = await deletePremiumAlbum(premiumAlbumId);
    res.status(200).json(deletedPremiumAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
