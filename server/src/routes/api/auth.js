const router = require('express').Router();
const passport = require('../../config/passport');
const AuthController = require('../../controllers/auth.controller')
const authMiddleware = require('../../middlewares/auth.middleware')


router.post('/auth/signup', AuthController.signUp)

router.get('/auth/verify-email', AuthController.verifyEmail)

router.post('/auth/signin', AuthController.signIn)

router.post('/auth/forgot', AuthController.forgotPassword)

router.post('/auth/reset/:token', AuthController.resetPassword)

router.post('/auth/logout', authMiddleware ,AuthController.logOut)

router.get('/auth/newtoken' ,AuthController.newToken);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}oauth/google`,
    failureRedirect: '/login',
  }),
);

router.get('/auth/0auth/success',AuthController.googleAuth)

router.get('/ok', authMiddleware,(req, res) => {
  res.send('ok')
})


module.exports = router;
