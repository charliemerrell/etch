const express = require("express");
const userRouter = require("./user");
const cardRouter = require("./card");
const cardModel = require("../models/card");

const router = express.Router();

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.get("/home", async (req, res) => {
    const cards = await cardModel.getAllCards(req.session.userId);
    res.render("home", { cards });
});

router.get("/info", async (req, res) => {
    res.render("info");
});

module.exports = router;
