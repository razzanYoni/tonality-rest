import supertest from "supertest";
import { app } from "../src/cores/app";
import { deleteAllUserTest } from "./test-util";

describe("POST /api/signup", () => {
    afterEach(async () => {
        await deleteAllUserTest();
    });

    it("Should be able to create a new user.", async () => {
        const result = await supertest(app)
        .post("/api/signup")
        .send({
            username: "test",
            password: "test",
        });

        expect(result.status).toEqual(200);
        expect(result.body.username).toBe("test");
    });
});

describe("POST /api/login", () => {
    beforeEach(async () => {
        await deleteAllUserTest();
        await supertest(app)
        .post("/api/signup")
        .send({
            username: "test",
            password: "test",
        });
    });

    afterEach(async () => {
        await deleteAllUserTest();
    });

    it("Should be able to login.", async () => {
        const result = await supertest(app)
        .post("/api/login")
        .send({
            username: "test",
            password: "test",
        });

        expect(result.status).toEqual(200);
    });
});