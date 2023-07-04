const router = require('express').Router()
const {verifyToken} = require('../../middlewares/auth.middleware')
const UserController = require('../../controllers/user.controller')

// router.use(authMiddleware)
router.get('/user/:id' ,UserController.getUser);



router.get('/user/:id/notifications', verifyToken,UserController.getUserNotifications)

module.exports = router
