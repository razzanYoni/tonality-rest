import supertest from "supertest";
import { app } from "../src/cores/app";
import {
    addManyPremiumAlbumTest,
    deleteAllPremiumAlbumTest,
    deleteUsersTest,
} from "./test-util";

const signup = async () => {
await supertest(app)
        .post("/api/signup")
        .send({
            username: "test",
            password: "test",
        });
}

describe("POST /api/premium-album", () => {
    beforeEach(async () => {
    await signup();
  });

  afterEach(async () => {
    await deleteAllPremiumAlbumTest();
    await deleteUsersTest();
  });

  it("Should be able to create a new premium album.", async () => {
    // login first
      const loginResult = await supertest(app)
          .post("/api/login")
          .send({
              username: "test",
              password: "test",
          });

    const token = loginResult.body.accessToken;
    const fingerprintCookie = loginResult.header["set-cookie"][0];

    // create new premium album
    const result = await supertest(app)
        .post("/api/premium-album")
        .set("Authorization", `Bearer ${token}`)
        .set("Cookie", fingerprintCookie)
        .send({
            albumName: "test",
            releaseDate: new Date("2021-01-01"),
            genre: "test",
            artist: "test",
            coverFilename: "test",
        });


    expect(result.status).toEqual(200);
    expect(result.body.albumName).toBe("test");
    expect(result.body.artist).toBe("test");
    expect(result.body.releaseDate.toString()).toBe(
      "2021-01-01T00:00:00.000Z",
    );
    expect(result.body.genre).toBe("test");
    expect(result.body.coverFilename).toBe("test");
  });
});

describe("GET /api/premium-albums", () => {
  beforeEach(async () => {
    await signup();
    await deleteAllPremiumAlbumTest();
    await addManyPremiumAlbumTest();
  });

  afterEach(async () => {
    await deleteAllPremiumAlbumTest();
    await deleteUsersTest();
  });

  it("Should be able to get all premium albums.", async () => {
    // login first
    const loginResult = await supertest(app)
      .post("/api/login")
      .send({
        username: "test",
        password: "test",
      });

    const token = loginResult.body.accessToken;
    const fingerprintCookie = loginResult.header["set-cookie"][0];

    const result = await supertest(app)
        .get("/api/premium-albums")
        .set("Authorization", `Bearer ${token}`)
        .set("Cookie", fingerprintCookie)
        .query({
      size: 10,
      page: 1,
      searchQuery: "",
    });

    expect(result.status).toEqual(200);
    expect(result.body.paging.totalAlbums).toBe(20);
  });
});
