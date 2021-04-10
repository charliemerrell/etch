function expectSessionId(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = { expectSessionId };
