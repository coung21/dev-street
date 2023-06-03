const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth.middleware')
const UserController = require('../../controllers/user.controller')

router.use(authMiddleware)
router.get('/user/:username' ,UserController.getUser);
router.patch('/user/:username', UserController)

module.exports = router
