const db = require("../db");

const dayInMilliseconds = 1000 * 60 * 60 * 24;

const progressToMilliseconds = [
    dayInMilliseconds,
    2 * dayInMilliseconds,
    7 * dayInMilliseconds,
    30 * dayInMilliseconds,
    90 * dayInMilliseconds,
    180 * dayInMilliseconds,
];

function nextAnswerDue(progress) {
    if (progress < progressToMilliseconds.length) {
        return new Date(Date.now() + progressToMilliseconds[progress]);
    }
    return null;
}

function addCard(userId, question, answer) {
    return db.none(
        `INSERT INTO cards
            (user_id, question, answer, progress, next_answer_after) 
            values($1, $2, $3, $4, $5)`,
        [userId, question, answer, 0, nextAnswerDue(0)]
    );
}

function getAllCards(userId) {
    return db.any("SELECT * FROM cards WHERE user_id = $1", [userId]);
}

async function getCardsToBeAnswered(userId) {
    return db.any(
        `SELECT * FROM cards
        WHERE user_id = $1
        AND next_answer_after < now()`,
        [userId]
    );
}

async function cardBelongsToUser(cardId, userId) {
    const rows = await db.one(
        "SELECT COUNT(*) FROM cards WHERE id = $1 AND user_id = $2",
        [cardId, userId]
    );
    return rows.count === "1";
}

function getCard(cardId) {
    return db.oneOrNone("SELECT * FROM cards WHERE id = $1", [cardId]);
}

function deleteCard(cardId) {
    db.none("DELETE FROM cards WHERE id = $1", [cardId]);
}

async function handleAnswer(cardId, correct) {
    const card = await db.one("SELECT progress FROM cards WHERE id = $1", [
        cardId,
    ]);
    const progress = parseInt(card.progress, 10);
    const newProgress = correct ? progress + 1 : Math.max(0, progress - 2);
    db.none(
        "UPDATE cards SET progress = $1, next_answer_after = $2 WHERE id = $3",
        [newProgress, nextAnswerDue(newProgress), cardId]
    );
}

module.exports = {
    addCard,
    getAllCards,
    getCardsToBeAnswered,
    cardBelongsToUser,
    deleteCard,
    getCard,
    handleAnswer,
};
