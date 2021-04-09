const db = require('../db');

function create({ email, passwordHash }) {
  return db.one('INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id', [email, passwordHash]);
}

function getByEmail(email) {
  return db.oneOrNone('SELECT * FROM users WHERE email=$1', [email]);
}

module.exports = {
  create,
  getByEmail,
};
