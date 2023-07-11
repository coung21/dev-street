const router = require('express').Router()
const TagController = require('../../controllers/tag.controller')
const { verifyToken} = require('../../middlewares/auth.middleware')

router.get('/tag', TagController.getAllTag)
router.post('/tag/follow', verifyToken, TagController.followTag)
router.post('/tag/unfollow', verifyToken, TagController.unFollowTag)

module.exports = router