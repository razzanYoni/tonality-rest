import supertest from "supertest";
import { app } from "../src/cores/app";
import {addManyPremiumAlbumTest, deleteAllPremiumAlbumTest} from "./test-util";

describe("POST /api/premium-album", () => {

    afterEach(async () => {
        await deleteAllPremiumAlbumTest();
    });

    it("should can add new premium album", async () => {
        const result = await supertest(app)
            .post("/api/premium-album")
            .send({
                albumName: "test",
                releaseDate: new Date("2021-01-01"),
                genre: "test",
                artist: "test",
                coverFilename: "test"
            })

        expect(result.status).toEqual(200);
        expect(result.body.data.albumName).toBe("test");
        expect(result.body.data.artist).toBe("test");
        expect(result.body.data.releaseDate.toString()).toBe("2021-01-01T00:00:00.000Z");
        expect(result.body.data.genre).toBe("test");
        expect(result.body.data.coverFilename).toBe("test");
    });
});

describe('GET /api/premium-albums', () => {
    beforeEach(async () => {
        await deleteAllPremiumAlbumTest();
        await addManyPremiumAlbumTest();
    });

    afterEach(async () => {
        await deleteAllPremiumAlbumTest();
    });

    it('should can get all premium albums', async () => {
        const result = await supertest(app)
            .get('/api/premium-albums')
            .query({
                size: 10,
                page: 1,
                searchQuery: ''
            });

        expect(result.status).toEqual(200);
        expect(result.body.paging.totalAlbums).toBe(20);
    });
});
