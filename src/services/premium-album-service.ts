import { PremiumAlbum, Prisma } from "@prisma/client";
import prismaClient from "../cores/db";
import ResponseError from "../errors/response-error";

const createPremiumAlbum = async (
  data: Prisma.PremiumAlbumCreateInput,
): Promise<PremiumAlbum> => {
  return prismaClient.premiumAlbum.create({
    data: {
      albumName: data.albumName,
      releaseDate: data.releaseDate,
      genre: data.genre,
      artist: data.artist,
      coverFilename: data.coverFilename,
    },
  });
};

const searchPremiumAlbum = async (reqQuery: {
  size: number | undefined;
  page: number | undefined;
  searchQuery: string | undefined;
}) => {
  const skip: number = ((reqQuery.page ?? 1) - 1) * (reqQuery.size ?? 10);

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
          },
        },
      ],
    });
  }

  const albums = await prismaClient.premiumAlbum.findMany({
    where: {
      AND: filters,
    },
    take: reqQuery.size,
    skip: skip,
  });

  const totalAlbums = await prismaClient.premiumAlbum.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: albums,
    paging: {
      page: reqQuery.page,
      totalAlbums: totalAlbums,
      totalPages: Math.ceil(totalAlbums / (reqQuery.size ?? 10)),
    },
  };
};

const updatePremiumAlbum = async (
  inputData: Prisma.PremiumAlbumCreateInput,
  premiumAlbumId: number,
): Promise<PremiumAlbum> => {
  const albumCount = await prismaClient.premiumAlbum.count({
    where: {
      albumId: premiumAlbumId,
    }
  });

  if (albumCount !== 1) {
    throw new ResponseError(404, "Album not found");
  }

  return prismaClient.premiumAlbum.update({
    where: {
      albumId: premiumAlbumId,
    },
    data: inputData,
  });
};

const deletePremiumAlbum = async (premiumAlbumId: number): Promise<PremiumAlbum> => {
  const albumCount = await prismaClient.premiumAlbum.count({
    where: {
        albumId: premiumAlbumId,
    }
    });

  if (albumCount !== 1) {
    throw new ResponseError(404, "Album not found");
  }

  return prismaClient.premiumAlbum.delete({
    where: {
      albumId: premiumAlbumId,
    },
  });
};

export {
  createPremiumAlbum,
  searchPremiumAlbum,
  updatePremiumAlbum,
  deletePremiumAlbum,
};
