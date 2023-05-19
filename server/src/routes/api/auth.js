const router = require('express').Router();
const passport = require('../../config/passport');
const AuthController = require('../../controllers/auth.controller')



router.post('/auth/signup', AuthController.SignUp)

router.get('/auth/verify-email', AuthController.VerifyEmail)

router.post('/auth/signin', AuthController.SignIn)

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/success'
  }),
  AuthController.googleAuth
);

router.get('/ok' ,(req, res) => {
  const {ok} = req.query
  res.json({ok})
})

module.exports = router;
