import { Prisma, PremiumAlbum, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export async function createPremiumAlbum(data: Prisma.PremiumAlbumCreateInput): Promise<PremiumAlbum> {
    // console.log(data);
    const premiumAlbum = await prisma.premiumAlbum.create({
        data: {
            album_name: data.album_name,
            release_date: data.release_date,
            genre: data.genre,
            artist: data.artist,
            cover_filename: data.cover_filename
        }
    });

    return premiumAlbum;
}

// READ
export async function getAllPremiumAlbum(): Promise<PremiumAlbum[]>  {
    const allPremiumAlbum = await prisma.premiumAlbum.findMany();
    return allPremiumAlbum;
}

// export async function getSinglePremiumAlbum(premiumAlbumId: number): Promise<PremiumAlbum>  {
//     const premiumAlbum = await prisma.premiumAlbum.findUniqueOrThrow({
//         where: {
//           album_id: premiumAlbumId,
//         },
//       });

//     return premiumAlbum;
// }

// UPDATE
export async function updatePremiumAlbum(inputData: Prisma.PremiumAlbumCreateInput, premiumAlbumId: number): Promise<PremiumAlbum> {
    const updatedPremiumAlbum = await prisma.premiumAlbum.update({
        where: { album_id:  premiumAlbumId},
        data: inputData
    });

    return updatedPremiumAlbum;
}

// DELETE
export async function deletePremiumAlbum(premiumAlbumId: number): Promise<void> {
    const deletedPremiumAlbum = await prisma.premiumAlbum.delete({
        where: {
            album_id: premiumAlbumId
        }
    });
}
