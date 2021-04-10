const express = require("express");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");

const user = require("../models/user");

const router = express.Router();

router.get("/me", (req, res) => {
    res.json({ userId: req.session.userId || null });
});

router.post("/signup", async (req, res) => {
    if (
        !emailValidator.validate(req.body.email) ||
        req.body.password.length < 8
    ) {
        res.sendStatus(404);
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
    req.session.userId = await user.create(userData);
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
    res.json({ userId: req.session.userId });
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sid").sendStatus(200);
    });
});

module.exports = router;
