const router = require('express').Router()
const TagController = require('../../controllers/tag.controller')

router.get('/tag', TagController.getAllTag)

module.exports = router