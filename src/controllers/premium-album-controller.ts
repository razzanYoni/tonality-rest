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
    const coverFile = req.file;
    const responseData = await PremiumAlbumService.createPremiumAlbum(data, coverFile);
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
        {
          size: req.query.size ? Number(req.query.size) : undefined,
          page: req.query.page ? Number(req.query.page) : undefined,
          searchQuery: req.query.searchQuery ? String(req.query.searchQuery) : undefined,
        }
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
    const coverFile = req.file;

    const updatedPremiumAlbum = await PremiumAlbumService.updatePremiumAlbum(
      data,
      premiumAlbumId,
      coverFile
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
