const router = require('express').Router();
const passport = require('../../config/passport');

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    const user = {
      id: req.user.googleId,
      name: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
    };
    res.status(200).json(user);
  }
);

module.exports = router;
