const request = require("supertest");
const app = require("../../src/index");

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

describe("POST /cards/:cardId/answer", () => {
    it("responds with 401 if no sid", (done) => {
        request(app)
            .post("/api/cards/1/answer")
            .send({ correct: true })
            .expect(401, done);
    });
});
