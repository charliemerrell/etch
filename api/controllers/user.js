const express = require('express');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const user = require('../models/user');
const { ensureNoSession } = require('../utils/auth');

const router = express.Router();

router.get('/signup', ensureNoSession, (req, res) => {
  res.render('signup');
});

router.post('/signup', ensureNoSession, async (req, res) => {
  if (!emailValidator.validate(req.body.email) || req.body.password.length < 8) {
    res.sendStatus(404);
  }
  if (await user.getByEmail(req.body.email)) {
    res.sendStatus(409);
    return;
  }
  const passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS, 10));
  const userData = {
    email: req.body.email,
    passwordHash,
  };
  req.session.userId = await user.create(userData);
  res.redirect('/info');
});

router.get('/login', ensureNoSession, async (req, res) => {
  res.render('login');
});

router.post('/login', ensureNoSession, async (req, res) => {
  const userRecord = await user.getByEmail(req.body.email);
  if (!userRecord) {
    res.status(404).render('login', { errorMessage: 'Invalid email/password combination' });
    return;
  }
  const passwordCorrect = await bcrypt.compare(req.body.password, userRecord.password_hash);
  if (!passwordCorrect) {
    res.status(404).render('login', { errorMessage: 'Invalid email/password combination' });
    return;
  }
  req.session.userId = userRecord.id;
  res.redirect('/home');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid').redirect('/users/login');
  });
});

module.exports = router;
