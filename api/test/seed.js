const db = require("../src/db");

async function seed(data) {
    if (data.users) {
        await seedUsers(data.users);
    }
    if (data.cards) {
        await seedCards(data.cards);
    }
}

async function seedUsers(users) {
    for (const { email, passwordHash } of users) {
        await db.one(
            "INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id",
            [email, passwordHash]
        );
    }
}

async function seedCards(cards) {
    for (const {
        userId,
        question,
        answer,
        progress,
        nextAnswerAfter,
    } of cards) {
        await db.none(
            `INSERT INTO cards
                (user_id, question, answer, progress, next_answer_after) 
                values($1, $2, $3, $4, $5)`,
            [userId, question, answer, progress, nextAnswerAfter]
        );
    }
}

module.exports = seed;
