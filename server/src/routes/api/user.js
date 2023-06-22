const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth.middleware')
const UserController = require('../../controllers/user.controller')

// router.use(authMiddleware)
router.get('/user/:id' ,UserController.getUser);
// router.patch('/user/:id', UserController)

module.exports = router
