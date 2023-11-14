import prismaClient from "../src/cores/db";

export const deleteAllUserTest = async () => {
    await prismaClient.user.deleteMany();
}

export const deleteAllPremiumAlbumTest = async () => {
    await prismaClient.premiumAlbum.deleteMany();
}

export const addManyPremiumAlbumTest = async () => {
    for (let i = 0; i < 20; i++) {
        await prismaClient.premiumAlbum.create({
            data: {
                albumName: `test ${i}`,
                artist: "test",
                releaseDate: new Date(`2021-01-0${i+1}`),
                genre: "test",
                coverFilename: "test",
            }
        });
    }
};

export const deleteUsersTest = async () => {
    await prismaClient.user.delete({
        where: {
            username: "test",
        }
    })
}
