const db = require("../db");

const dayInMilliseconds = 1000 * 60 * 60 * 24;

const progressToMilliseconds = [
    dayInMilliseconds,
    2 * dayInMilliseconds,
    7 * dayInMilliseconds,
    30 * dayInMilliseconds,
    90 * dayInMilliseconds,
    365 * dayInMilliseconds,
];

function nextAnswerDue(progress) {
    return new Date(Date.now() + progressToMilliseconds[progress]);
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

function cardReady(card) {
    console.log(card.next_answer_after, Date.now());
    return card.next_answer_after < Date.now();
}

async function getCardsToBeAnswered(userId) {
    return db.any(
        "SELECT * FROM cards WHERE user_id = $1 AND next_answer_after < now()",
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

function deleteCard(cardId) {
    db.none("DELETE FROM cards WHERE id = $1", [cardId]);
}

async function handleAnswer(cardId, correct) {
    const card = await db.one("SELECT progress FROM cards WHERE id = $1", [
        cardId,
    ]);
    const progress = parseInt(card.progress, 10);
    const newProgress = correct ? progress + 1 : Math.max(0, progress - 2);
    if (newProgress >= progressToMilliseconds.length) {
        deleteCard(cardId);
        return true;
    }
    db.none(
        "UPDATE cards SET progress = $1, next_answer_after = $2 WHERE id = $3",
        [newProgress, nextAnswerDue(newProgress), cardId]
    );
    return false;
}

module.exports = {
    addCard,
    getAllCards,
    getCardsToBeAnswered,
    cardBelongsToUser,
    deleteCard,
    handleAnswer,
};
