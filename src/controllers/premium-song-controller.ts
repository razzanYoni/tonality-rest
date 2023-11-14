import { NextFunction, Request, Response } from "express";
import * as PremiumSongService from "../services/premium-song-services"
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import {ErrorType, StandardError} from "../errors/standard-error";

const addNewSong = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = req.body;
        const premiumAlbumId = Number(req.params.premiumAlbumId);
        if (!req.file) {
            throw new StandardError(ErrorType.FILE_NOT_VALID);
        }
        data.audioFilename = req.file.filename;
        data.songNumber = Number(data.songNumber);
        if (data.discNumber) {
            data.discNumber = Number(data.discNumber);
        }
        data.duration = Number(data.duration);
        const responseData = await PremiumSongService.addNewSong(data, premiumAlbumId);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
};

const getAllSongFromAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const premiumAlbumId = Number(req.params.premiumAlbumId);
        const responseData = await PremiumSongService.getAllSongFromAlbum(premiumAlbumId);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
};

const updatePremiumSong = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = req.body;
        const premiumAlbumId = Number(req.params.premiumAlbumId);
        const premiumSongId = Number(req.params.premiumSongId);
        if (data.songNumber) {
            data.songNumber = Number(data.songNumber);
        }
        if (data.discNumber) {
            data.discNumber = Number(data.discNumber);
        }
        if (data.duration) {
            data.duration = Number(data.duration);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (req.files && req.files[0]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data.audioFilename = req.files[0].filename;
        }
        const responseData = await PremiumSongService.updatePremiumSong(data, premiumAlbumId, premiumSongId);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
};

const deletePremiumSong = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const premiumAlbumId = Number(req.params.premiumAlbumId);
        const premiumSongId = Number(req.params.premiumSongId);
        const responseData = await PremiumSongService.deletePremiumSong(premiumAlbumId, premiumSongId);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
};


export {
    addNewSong,
    getAllSongFromAlbum,
    updatePremiumSong,
    deletePremiumSong,
};
