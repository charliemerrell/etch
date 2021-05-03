const request = require("supertest");

const app = require("../../src/index");
const db = require("../../src/db");
const resetDb = require("../../resetDb");
const seed = require("../../scripts/seed");

describe("User route", () => {
    const seedData = {
        users: [
            {
                email: "johnsmith@etchtestapp.com",
                password: "password1",
            },
        ],
    };

    before(async () => {
        await resetDb();
        await seed(seedData);
    });
    beforeEach(() => {
        return db.query("START TRANSACTION");
    });
    afterEach(() => {
        return db.query("ROLLBACK");
    });

    describe("POST /user/signup", () => {
        it("responds with 422 if email invalid", (done) => {
            request(app)
                .post("/api/user/signup")
                .send({ email: "blah", password: "admin123456" })
                .expect(422, done);
        });
        it("responds with 422 if password too short", (done) => {
            request(app)
                .post("/api/user/signup")
                .send({ email: "john.smith@gmail.com", password: "1234567" })
                .expect(422, done);
        });
        it("responds with 201 if fields are valid", (done) => {
            request(app)
                .post("/api/user/signup")
                .send({ email: "joh.smith@gmail.com", password: "12345678" })
                .expect(201, done);
        });
        it("responds with 409 if username is already taken", (done) => {
            request(app)
                .post("/api/user/signup")
                .send({ email: seedData.users[0].email, password: "12345678" })
                .expect(409, done);
        });
    });

    describe("POST /user/login", () => {
        it("responds with 404 if email not in database", (done) => {
            request(app)
                .post("/api/user/login")
                .send({
                    email: "akdklahahh3rhjkashdkah3",
                    password: "admin1234545",
                })
                .expect(404, done);
        });
        it("responds with 404 if password incorrect", (done) => {
            request(app)
                .post("/api/user/login")
                .send({
                    email: seedData.users[0].email,
                    password: "password2",
                })
                .expect(404, done);
        });
        it("responds with 200 if login correct", (done) => {
            request(app)
                .post("/api/user/login")
                .send({
                    email: seedData.users[0].email,
                    password: "password1",
                })
                .expect(200, done);
        });
    });
});
