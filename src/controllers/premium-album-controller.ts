import { NextFunction, Request, Response } from "express";
import * as PremiumAlbumService from "../services/premium-album-service";
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";

const createPremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body;
    const responseData = await PremiumAlbumService.createPremiumAlbum(data);
    generateResponse(res, StatusCodes.OK, responseData);
  } catch (err) {
    next(err);
  }
};

const searchPremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const allPremiumAlbum = await PremiumAlbumService.searchPremiumAlbum(
      req.body,
    );
    generateResponse(res, StatusCodes.OK, allPremiumAlbum);
  } catch (err) {
    next(err);
  }
};

const updatePremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);
    const data = req.body;

    const updatedPremiumAlbum = await PremiumAlbumService.updatePremiumAlbum(
      data,
      premiumAlbumId,
    );
    generateResponse(res, StatusCodes.OK, updatedPremiumAlbum);
  } catch (err) {
    next(err);
  }
};

const deletePremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const premiumAlbumId = Number(req.params.premiumAlbumId);

    const deletedPremiumAlbum =
      await PremiumAlbumService.deletePremiumAlbum(premiumAlbumId);
    generateResponse(res, StatusCodes.OK, deletedPremiumAlbum);
  } catch (err) {
    next(err);
  }
};

export {
  createPremiumAlbum,
  searchPremiumAlbum,
  updatePremiumAlbum,
  deletePremiumAlbum,
};
