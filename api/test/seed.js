const db = require("../src/db");

async function seed(data) {
    for (let key in data) {
        if (key === "users") {
            await seedUsers(data["users"]);
        } else if (key === "cards") {
            await seedCards(data["cards"]);
        }
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

module.exports = seed;
