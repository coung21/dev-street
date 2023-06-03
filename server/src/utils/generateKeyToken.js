const jwt = require('jsonwebtoken');
const crypto = require('crypto')

async function generateTokenPair(payload, privateKey) {
  const accessToken = await jwt.sign(payload, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256',
  });
  const refreshToken = await jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
  });
  return { accessToken, refreshToken };
}

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  return { publicKey, privateKey };
}
module.exports = { generateTokenPair, generateKeyPair };
