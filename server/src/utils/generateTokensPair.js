const jwt = require('jsonwebtoken')

async function generateTokenPair(payload, privateKey){
  const accessToken = await jwt.sign(payload, privateKey, {expiresIn: '3d', algorithm: 'RS256'})
  const refreshToken = await jwt.sign(payload, privateKey, {expiresIn: '30d',algorithm: 'RS256'})
  return {accessToken, refreshToken}
}

module.exports = {generateTokenPair}