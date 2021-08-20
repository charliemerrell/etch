const express = require("express");
const card = require("../models/card");
const { expectSessionId } = require("../utils/auth");

const router = express.Router();
router.use(expectSessionId);

router.get("/", async (req, res) => {
    const rows = req.query.all
        ? await card.getAllCards(req.session.userId)
        : await card.getCardsToBeAnswered(req.session.userId);
    const cards = await rows.map(({ id, question, answer, progress }) => {
        return { id, question, answer, progress };
    });
    res.json({ cards });
});

router.post("/", async (req, res) => {
    await card.addCard(req.session.userId, req.body.question, req.body.answer);
    res.sendStatus(201);
});

router.get("/:id", async (req, res) => {
    const cardRecord = await card.getCard(req.params.id);
    res.json(cardRecord);
});

router.post("/:cardId/answer", async (req, res) => {
    if (await card.cardBelongsToUser(req.params.cardId, req.session.userId)) {
        await card.handleAnswer(req.params.cardId, req.body.correct);
        res.sendStatus(200);
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
