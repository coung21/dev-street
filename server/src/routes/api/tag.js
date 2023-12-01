const router = require('express').Router()
const TagController = require('../../controllers/tag.controller')
const { verifyToken} = require('../../middlewares/auth.middleware')

router.get('/tag', TagController.getAllTag)
router.get('/tag/:id', TagController.getFollowTag)
router.post('/tag/follow', verifyToken, TagController.followTag)
router.post('/tag/unfollow', verifyToken, TagController.unFollowTag)
router.post('/tag', TagController.seacrchTag)

module.exports = router