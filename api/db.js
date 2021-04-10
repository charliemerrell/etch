const pgp = require("pg-promise")();

const db = pgp(
    `postgres://backend:${process.env.DATABASE_PASSWORD}@localhost:5432/test` // should be db name too
);

module.exports = db;
