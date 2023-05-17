const router = require('express').Router();
const passport = require('../../config/passport');
const AuthController = require('../../controllers/auth.controller')

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  AuthController.googleAuth
);

module.exports = router;
