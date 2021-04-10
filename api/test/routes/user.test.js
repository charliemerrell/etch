const request = require("supertest");
const app = require("../../src/index");

describe("POST /users/signup", () => {
    it("responds with 422 if email invalid", (done) => {
        request(app)
            .post("/api/users/signup")
            .send({ email: "blah", password: "admin123456" })
            .expect(422, done);
    });
    it("responds with 422 if password too short", (done) => {
        request(app)
            .post("/api/users/signup")
            .send({ email: "john.smith@gmail.com", password: "1234567" })
            .expect(422, done);
    });
});

describe("POST /users/login", () => {
    it("responds with 404 if email not in database", (done) => {
        request(app)
            .post("/api/users/login")
            .send({
                email: "akdklahahh3rhjkashdkah3",
                password: "admin1234545",
            })
            .expect(404, done);
    });
});
