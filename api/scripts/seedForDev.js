const bcrypt = require("bcrypt");

const resetDb = require("./resetDb");
const seed = require("./seed");

const seedData = {
    users: [
        {
            email: "johnsmith@etchtestapp.com",
            password: "password1",
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

resetDb().then(() => seed(seedData));
