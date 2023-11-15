import { NextFunction, Request, Response } from "express";
import * as PremiumAlbumService from "../services/premium-album-service";
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import {ErrorType, StandardError} from "../errors/standard-error";
import phpClient from "../clients/php-client";
import * as path from "path";
import {v4 as uuidv4} from 'uuid';

const createPremiumAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body;
    if (!req.file) {
        throw new StandardError(ErrorType.FILE_NOT_VALID);
    }
    // data.coverFilename = req.file.filename;
    data.coverFilename = uuidv4() + path.extname(req.file.originalname);
    const responseData = await PremiumAlbumService.createPremiumAlbum(data);
    await phpClient(
        process.env.PHP_URL + "upload",
        "POST",
        {
          file : {
            filename: data.coverFilename,
            buffer: req.file.buffer
          }
        },
        true
    )
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req.files && req.files[0]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.coverFilename = uuidv4() + path.extname(req.files[0].originalname);
    }

    const updatedPremiumAlbum = await PremiumAlbumService.updatePremiumAlbum(
      data,
      premiumAlbumId,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req.files && req.files[0]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await phpClient(
          process.env.PHP_URL + "upload",
          "POST",
          {
              file : {
                  filename: data.coverFilename,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  buffer: req.files[0].buffer
              }
          },
          true
      )
    }
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
