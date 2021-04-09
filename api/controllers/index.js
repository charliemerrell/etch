const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const cardModel = require('../models/card');
const { ensureSession } = require('../utils/auth');

const router = express.Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/home', ensureSession, async (req, res) => {
  const cards = await cardModel.getAllCards(req.session.userId);
  res.render('home', { cards });
});

router.get('/info', ensureSession, async (req, res) => {
  res.render('info');
});

module.exports = router;
