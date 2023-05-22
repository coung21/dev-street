const router = require('express').Router();
const passport = require('../../services/passport.service');
const AuthController = require('../../controllers/auth.controller')
const authMiddleware = require('../../middlewares/auth.middleware')


router.post('/auth/signup', AuthController.SignUp)

router.get('/auth/verify-email', AuthController.VerifyEmail)

router.post('/auth/signin', AuthController.SignIn)

router.post('/auth/forgot', AuthController.ForgotPassword)

router.post('/auth/reset/:token', AuthController.ResetPassword)

router.post('/auth/logout',authMiddleware ,AuthController.LogOut)

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

router.get('/ok', authMiddleware ,(req, res) => {
  res.json('ok')
})

module.exports = router;
