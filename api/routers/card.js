const express = require("express");
const card = require("../models/card");

const router = express.Router();

router.get("/me", (req, res) => {
    res.send(req.session.userId);
});

router.post("/", async (req, res) => {
    await card.addCard(req.session.userId, req.body.question, req.body.answer);
    res.sendStatus(201);
});

router.post("/:cardId/answer", async (req, res) => {
    if (await card.cardBelongsToUser(req.params.cardId, req.session.userId)) {
        const cardFinished = await card.handleAnswer(
            req.params.cardId,
            req.body.correct
        );
        res.send(cardFinished ? "finished" : "");
    } else {
        res.sendStatus(403);
    }
});

router.delete("/:cardId", async (req, res) => {
    if (await card.cardBelongsToUser(req.params.cardId, req.session.userId)) {
        card.deleteCard(req.params.cardId);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
