const express = require('express')
const {userRegister, userLogin} = require('../controllers/authController')
const jwt = require('jsonwebtoken');


const router = express.Router()

// const vertify = (req, res, next) => {
//   const authHeader = req.headers.authorization
//   if(authHeader){
//     const token = authHeader.split(" ")[1]
//     jwt.verify(token, process.env.SECRECT_JWT, (err,payload) => {
//       if(err) res.status(403).json('token is not valid')
//     });
//     next()
//   } else {
//     return res.status(403).json('you are not authenticated')
//   }
// }

//register
router.post('/register', userRegister)
//login
router.post('/login', userLogin)
//test
// router.get('/test', vertify, (req,res) => {
//   res.status(200).json("success")  
// })


module.exports = router