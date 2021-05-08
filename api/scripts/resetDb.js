const db = require("../src/db");

async function resetDb() {
    await db.query("DROP TABLE IF EXISTS cards");
    await db.query("DROP TABLE IF EXISTS users");

    await db.query(
        `CREATE TABLE IF NOT EXISTS users (
            id INT GENERATED ALWAYS AS IDENTITY,
            email VARCHAR(320) NOT NULL UNIQUE,
            password_hash VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            PRIMARY KEY (id)
        )`
    );
    await db.query(
        `CREATE TABLE IF NOT EXISTS cards (
            id INT GENERATED ALWAYS AS IDENTITY,
            user_id INT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            next_answer_after TIMESTAMP,
            progress INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id)
                REFERENCES users (id)
        )`
    );
}

module.exports = resetDb;
