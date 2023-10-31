import {NextFunction, Request, Response} from "express";
import {
  createPremiumAlbum,
  deletePremiumAlbum,
  searchPremiumAlbum,
  updatePremiumAlbum,
} from "../services/premium-album-service";

export const createPremAlbum = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const data = req.body;
    const responseData = await createPremiumAlbum(data);
    res.status(200).json({data: responseData});
  } catch (error) {
    next(error)
  }
}

export const searchPremAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPremiumAlbum = await searchPremiumAlbum(req.body);
    res.status(200).json(allPremiumAlbum);
  } catch (error) {
    next(error)
  }
}

export const updatePremAlbum = async (req: Request, res: Response, next : NextFunction)=> {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);
    const data = req.body;

    const updatedPremiumAlbum = await updatePremiumAlbum(data, premiumAlbumId);
    res.status(200).json(updatedPremiumAlbum);
  } catch (error) {
    next(error);
  }
}

export const deletePremAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);

    const deletedPremiumAlbum = await deletePremiumAlbum(premiumAlbumId);
    res.status(200).json(deletedPremiumAlbum);
  } catch (error) {
    next(error);
  }
}
