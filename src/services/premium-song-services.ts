import { PremiumSong, Prisma } from "@prisma/client";
import prismaClient from "../cores/db";
import { ErrorType, StandardError } from "../errors/standard-error";
import {validate} from "../validation/validation";
import {
    addNewSongSchema, deletePremiumSongSchema,
    getAllSongFromAlbumSchema, updatePremiumSongSchema
} from "../validation/premium-song-validation";

const addNewSong = async (
    data: Prisma.PremiumSongCreateInput,
    premiumAlbumId: number
): Promise<PremiumSong> => {
    validate(addNewSongSchema, { premiumAlbumId, ...data});

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

const getAllSongFromAlbum = async (
    premiumAlbumId: number
): Promise<PremiumSong[]> => {
    validate(getAllSongFromAlbumSchema, { premiumAlbumId })
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
    addNewSong,
    getAllSongFromAlbum,
    updatePremiumSong,
    deletePremiumSong,
};
