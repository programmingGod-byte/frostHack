const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '/dashboard')
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '/dashboard')
);

router.get('/user', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not authenticated' });
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect(process.env.FRONTEND_URL));
});

module.exports = router;
