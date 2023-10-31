import { NextFunction, Request, Response } from "express";
import * as PremiumAlbumService from "../services/premium-album-service";

const createPremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const responseData = await PremiumAlbumService.createPremiumAlbum(data);
    res.status(200).json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

const searchPremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allPremiumAlbum = await PremiumAlbumService.searchPremiumAlbum(
      req.body,
    );
    res.status(200).json(allPremiumAlbum);
  } catch (error) {
    next(error);
  }
};

const updatePremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);
    const data = req.body;

    const updatedPremiumAlbum = await PremiumAlbumService.updatePremiumAlbum(
      data,
      premiumAlbumId,
    );
    res.status(200).json(updatedPremiumAlbum);
  } catch (error) {
    next(error);
  }
};

const deletePremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);

    const deletedPremiumAlbum =
      await PremiumAlbumService.deletePremiumAlbum(premiumAlbumId);
    res.status(200).json(deletedPremiumAlbum);
  } catch (error) {
    next(error);
  }
};

export {
  createPremiumAlbum,
  searchPremiumAlbum,
  updatePremiumAlbum,
  deletePremiumAlbum,
};
