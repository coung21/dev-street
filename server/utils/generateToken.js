const jwt = require('jsonwebtoken')

function generateAccessToken(payload){
  const token = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: '3h'})
  return token
}

function generateRefreshToken(payload){
  const token = jwt.sign(payload, process.env.SECRET_JWT_REFRESH)
  return token
}

module.exports= {
  generateAccessToken,
  generateRefreshToken
}