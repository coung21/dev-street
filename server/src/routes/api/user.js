const router = require('express').Router()
const {verifyToken} = require('../../middlewares/auth.middleware')
const upload = require('../../middlewares/upload.middleware')
const UserController = require('../../controllers/user.controller')

router.get('/user/:id' ,UserController.getUser);


router.post('/user/:id/edit', verifyToken,upload.single('avatar') ,UserController.editUser)
router.get('/user/:id/notifications', verifyToken,UserController.getUserNotifications)
router.get('/user/:id/readinglist', UserController.getReadingList)

module.exports = router
