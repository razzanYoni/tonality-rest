import { PremiumAlbum, PremiumSong, Prisma } from "@prisma/client";
import prismaClient from "../cores/db";
import { ErrorType, StandardError } from "../errors/standard-error";

const addNewSong = async (
    data: Prisma.PremiumSongCreateInput,
    premiumAlbumId: number
): Promise<PremiumSong> => {
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
    return prismaClient.premiumSong.findMany({
        where: {
            albumId: premiumAlbumId
        }
    })
}

const updatePremiumSong = async (
    inputData: Prisma.PremiumSongCreateInput,
    premiumAlbumId: number,
    premiumSongId: number
): Promise<PremiumSong> => {
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