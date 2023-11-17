import { PremiumSong, Prisma } from "@prisma/client";
import prismaClient from "../cores/db";
import { ErrorType, StandardError } from "../errors/standard-error";
import {validate} from "../validation/validation";
import {
    addNewPremiumSongSchema, deletePremiumSongSchema,
    getAllPremiumSongFromAlbumSchema, getPremiumSongByIdSchema, updatePremiumSongSchema
} from "../validation/premium-song-validation";

const addNewPremiumSong = async (
    data: Prisma.PremiumSongCreateInput,
    premiumAlbumId: number
): Promise<PremiumSong> => {
    validate(addNewPremiumSongSchema, { premiumAlbumId, ...data});

    return prismaClient.premiumSong.create({
        data: {
            albumId: premiumAlbumId,
            title: data.title,
            artist: data.artist,
            songNumber: data.songNumber,
            discNumber: data.discNumber,
            duration: data.duration,
            audioFilename: data.audioFilename
        }
    })
};

const getPremiumSongById = async (
  premiumSongId: number,
): Promise<PremiumSong> => {
    validate(getPremiumSongByIdSchema, { premiumSongId })
    const premiumSong = await prismaClient.premiumSong.findUnique({
        where: {
            songId: premiumSongId
        }
    })

    if (!premiumSong) {
        throw new StandardError(ErrorType.SONG_NOT_FOUND);
    }

    return premiumSong;
}

const getAllPremiumSongFromAlbum = async (
    premiumAlbumId: number
): Promise<PremiumSong[]> => {
    validate(getAllPremiumSongFromAlbumSchema, { premiumAlbumId })
    return prismaClient.premiumSong.findMany({
        where: {
            albumId: premiumAlbumId
        }
    })
}

const updatePremiumSong = async (
    inputData: Prisma.PremiumSongUpdateInput,
    premiumAlbumId: number,
    premiumSongId: number
): Promise<PremiumSong> => {
    validate(updatePremiumSongSchema, { premiumAlbumId, premiumSongId, ...inputData })

    const songCount = await prismaClient.premiumSong.count({
        where: {
            songId: premiumSongId,
            albumId: premiumAlbumId
        }
    });

    if (songCount != 1) {
        throw new StandardError(ErrorType.SONG_NOT_FOUND);
    }

    return prismaClient.premiumSong.update({
        where: {
            songId: premiumSongId,
            albumId: premiumAlbumId
        },
        data: inputData
    })
};

const deletePremiumSong = async (
    premiumAlbumId: number,
    premiumSongId: number
): Promise<PremiumSong> => {
    validate(deletePremiumSongSchema, { premiumAlbumId, premiumSongId })

    const songCount = await prismaClient.premiumSong.count({
        where: {
            songId: premiumSongId,
            albumId: premiumAlbumId
        }
    })

    if (songCount != 1) {
        throw new StandardError(ErrorType.SONG_NOT_FOUND);
    }

    return prismaClient.premiumSong.delete({
        where: {
            songId: premiumSongId,
            albumId: premiumAlbumId
        }
    })
};

export {
    addNewPremiumSong,
    getPremiumSongById,
    getAllPremiumSongFromAlbum,
    updatePremiumSong,
    deletePremiumSong,
};
