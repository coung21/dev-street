const router = require('express').Router()
const {check} = require('express-validator')
const authMiddleware = require('../../middlewares/auth.middleware')

//unprotected post api

//protected post api
router.use(authMiddleware)

module.exports = router