const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth.middleware')
const UserController = require('../../controllers/user.controller')


router.get('/user/:username',authMiddleware ,UserController.getUser);

module.exports = router
