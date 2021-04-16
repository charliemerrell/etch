const express = require("express");
const card = require("../models/card");
const { expectSessionId } = require("../utils/auth");

const router = express.Router();

router.get("/", expectSessionId, async (req, res) => {
    const rows = await card.getAllCards(req.session.userId);
    const cards = await rows.map(({ id, question, answer }) => {
        return { id, question, answer };
    });
    res.json({ cards });
});

router.post("/", expectSessionId, async (req, res) => {
    await card.addCard(req.session.userId, req.body.question, req.body.answer);
    res.sendStatus(201);
});

router.post("/:cardId/answer", expectSessionId, async (req, res) => {
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

router.delete("/:cardId", expectSessionId, async (req, res) => {
    if (await card.cardBelongsToUser(req.params.cardId, req.session.userId)) {
        card.deleteCard(req.params.cardId);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;