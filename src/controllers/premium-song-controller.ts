import { NextFunction, Request, Response } from "express";
import * as PremiumSongService from "../services/premium-song-services"
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";

const addNewSong = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = req.body;
        const premiumAlbumId = Number(req.params.premiumAlbumId);
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
