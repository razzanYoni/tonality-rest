import { NextFunction, Request, Response } from "express";
import * as PremiumSongService from "../services/premium-song-services"
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import {ErrorType, StandardError} from "../errors/standard-error";
import phpClient from "../clients/php-client";
import {v4 as uuidv4} from "uuid";
import path from "path";
import saveFile from "../utils/file-processing";

const addNewPremiumSong = async (
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
        data.audioFilename = uuidv4() + path.extname(req.file.originalname);
        data.songNumber = Number(data.songNumber);
        if (data.discNumber) {
            data.discNumber = Number(data.discNumber);
        }
        data.duration = Number(data.duration);
        const responseData = await PremiumSongService.addNewPremiumSong(data, premiumAlbumId);
        await phpClient(
            process.env.PHP_URL + "upload",
            "POST",
            {
                file : {
                    filename: data.audioFilename,
                    buffer: req.file.buffer
                }
            },
            true
        )
        await saveFile(req.file, data.audioFilename)
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
};

const getPremiumSongById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const premiumSongId = Number(req.params.premiumSongId);
        const responseData = await PremiumSongService.getPremiumSongById(premiumSongId);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
}

const getAllPremiumSongFromAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const premiumAlbumId = Number(req.params.premiumAlbumId);
        const responseData = await PremiumSongService.getAllPremiumSongFromAlbum(premiumAlbumId);
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
            data.audioFilename = uuidv4() + path.extname(req.files[0].originalname);
        }
        const responseData = await PremiumSongService.updatePremiumSong(data, premiumAlbumId, premiumSongId);
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
                        filename: data.audioFilename,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        buffer: req.files[0].buffer
                    }
                },
                true
            )
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await saveFile(req.files[0], data.audioFilename)
        }
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
    addNewPremiumSong,
    getPremiumSongById,
    getAllPremiumSongFromAlbum,
    updatePremiumSong,
    deletePremiumSong,
};
