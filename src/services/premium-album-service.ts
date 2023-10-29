import { PremiumAlbum, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export async function createPremiumAlbum(
  data: Prisma.PremiumAlbumCreateInput,
): Promise<PremiumAlbum> {
  // console.log(data);
  const premiumAlbum = await prisma.premiumAlbum.create({
    data: {
      albumName: data.albumName,
      releaseDate: data.releaseDate,
      genre: data.genre,
      artist: data.artist,
      coverFilename: data.coverFilename,
    },
  });

  return premiumAlbum;
}

// READ
export async function getAllPremiumAlbum(): Promise<PremiumAlbum[]> {
  const allPremiumAlbum = await prisma.premiumAlbum.findMany();
  return allPremiumAlbum;
}

// export async function getSinglePremiumAlbum(premiumAlbumId: number): Promise<PremiumAlbum>  {
//     const premiumAlbum = await prisma.premiumAlbum.findUniqueOrThrow({
//         where: {
//           albumId: premiumAlbumId,
//         },
//       });

//     return premiumAlbum;
// }

// UPDATE
export async function updatePremiumAlbum(
  inputData: Prisma.PremiumAlbumCreateInput,
  premiumAlbumId: number,
): Promise<PremiumAlbum> {
  const updatedPremiumAlbum = await prisma.premiumAlbum.update({
    where: { albumId: premiumAlbumId },
    data: inputData,
  });

  return updatedPremiumAlbum;
}

// DELETE
export async function deletePremiumAlbum(
  premiumAlbumId: number,
): Promise<void> {
  const deletedPremiumAlbum = await prisma.premiumAlbum.delete({
    where: {
      albumId: premiumAlbumId,
    },
  });
}
