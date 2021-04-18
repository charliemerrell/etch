const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../src/index");
const db = require("../../src/db");
const resetDb = require("../../resetDb");
const seed = require("../seed");

describe("Card route", () => {
    const seedData = {
        users: [
            {
                email: "johnsmith@etchtestapp.com",
                passwordHash: bcrypt.hashSync("password1", 10),
            },
        ],
        cards: [
            {
                userId: 1,
                question: "Capital of England",
                answer: "London",
                progress: 0,
                nextAnswerAfter: new Date(Date.now() - 1),
            },
            {
                userId: 1,
                question: "Capital of France",
                answer: "Paris",
                progress: 0,
                nextAnswerAfter: new Date(Date.now() + 100000000),
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
    describe("GET /cards", () => {
        it("responds with 401 if no sid", (done) => {
            request(app).get("/api/cards").expect(401, done);
        });
    });

    describe("DELETE /cards/:cardId", () => {
        it("responds with 401 if no sid", (done) => {
            request(app).delete("/api/cards/1").expect(401, done);
        });
    });

    describe("POST /cards", () => {
        it("responds with 401 if no sid", (done) => {
            request(app)
                .post("/api/cards")
                .send({
                    question: "What is the capital of England?",
                    asnwer: "London",
                })
                .expect(401, done);
        });
    });

    describe("POST /cards/:cardId/answer", () => {
        it("responds with 401 if no sid", (done) => {
            request(app)
                .post("/api/cards/1/answer")
                .send({ correct: true })
                .expect(401, done);
        });
    });
});
