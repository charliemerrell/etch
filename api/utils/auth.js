function ensureSession(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/users/login');
  } else {
    next();
  }
}

function ensureNoSession(req, res, next) {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
}

module.exports = { ensureSession, ensureNoSession };
