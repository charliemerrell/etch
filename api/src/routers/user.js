const express = require("express");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const { expectSessionId } = require("../utils/auth");
const db = require("../db");

const user = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    if (
        !emailValidator.validate(req.body.email) ||
        req.body.password.length < 8
    ) {
        res.sendStatus(422);
        return;
    }
    if (await user.getByEmail(req.body.email)) {
        res.sendStatus(409);
        return;
    }
    const passwordHash = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS, 10)
    );
    const userData = {
        email: req.body.email,
        passwordHash,
    };
    const { id } = await user.create(userData);
    req.session.userId = id;
    res.sendStatus(201);
});

router.post("/login", async (req, res) => {
    const userRecord = await user.getByEmail(req.body.email);
    if (!userRecord) {
        res.sendStatus(404);
        return;
    }
    const passwordCorrect = await bcrypt.compare(
        req.body.password,
        userRecord.password_hash
    );
    if (!passwordCorrect) {
        res.sendStatus(404);
        return;
    }
    req.session.userId = userRecord.id;
    res.sendStatus(200);
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sid").sendStatus(200);
    });
});

router.patch("/", expectSessionId, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userRecord = await db.one(
        "SELECT password_hash FROM users WHERE id = $1",
        [req.session.userId]
    );
    const passwordCorrect = await bcrypt.compare(
        oldPassword,
        userRecord.password_hash
    );
    if (!passwordCorrect) {
        res.sendStatus(401);
        return;
    }
    const newPasswordHash = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUNDS, 10)
    );
    await db.none("UPDATE users SET password_hash = $1 WHERE id = $2", [
        newPasswordHash,
        req.session.userId,
    ]);
    res.sendStatus(200);
});

module.exports = router;
