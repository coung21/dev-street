const express = require('express')
const {userRegister, userLogin, newToken} = require('../controllers/authController')
const {generateAccessToken} = require('../utils/generateToken')
const authMiddleware = require('../middlewares/authMiddlware')


const router = express.Router()


//register
router.post('/register', userRegister)
//login
router.post('/login', userLogin)
//get new access token
router.post('/token', newToken)
//test
router.post('/test', authMiddleware, (req,res) => {
  res.status(200).json('test')
})


module.exports = router