import { Prisma, PremiumAlbum } from "@prisma/client";
import prismaClient from "../cores/db";

// CREATE
export const createPremiumAlbum = async (data: Prisma.PremiumAlbumCreateInput): Promise<PremiumAlbum> => {
    return prismaClient.premiumAlbum.create({
        data: {
            albumName: data.albumName,
            releaseDate: data.releaseDate,
            genre: data.genre,
            artist: data.artist,
            coverFilename: data.coverFilename
        }
    });
}

// READ
export const searchPremiumAlbum = async (
    reqQuery : {
        size : number | undefined,
        page : number | undefined,
        searchQuery : string | undefined
    }) => {
    const skip : number = ((reqQuery.page ?? 1) - 1) * (reqQuery.size ?? 10);

    const filters = [];

    if (reqQuery.searchQuery) {
        filters.push({
            OR: [
                {
                    albumName: {
                        contains: reqQuery.searchQuery,
                    },
                },
                {
                    artist: {
                        contains: reqQuery.searchQuery,
                    }
                }
            ]
        });
    }

    const albums = await prismaClient.premiumAlbum.findMany({
        where: {
            AND: filters
        },
        take: reqQuery.size,
        skip: skip,
    });

    const totalAlbums = await prismaClient.premiumAlbum.count({
        where: {
            AND: filters
        }
    });

    return {
        data: albums,
        paging: {
            page: reqQuery.page,
            totalAlbums: totalAlbums,
            totalPages: Math.ceil(totalAlbums / (reqQuery.size ?? 10))
        }
    }
}

// UPDATE
export const updatePremiumAlbum = async (inputData: Prisma.PremiumAlbumCreateInput, premiumAlbumId: number): Promise<PremiumAlbum> => {
    return prismaClient.premiumAlbum.update({
        where: {
            albumId:  premiumAlbumId
        },
        data: inputData
    });
}

// DELETE
export const deletePremiumAlbum = (premiumAlbumId: number): Promise<PremiumAlbum> => {
    return prismaClient.premiumAlbum.delete({
        where: {
            albumId: premiumAlbumId
        }
    });
}
