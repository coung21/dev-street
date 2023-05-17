const userModel = require('../models/user.model')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const {getData} = require('../utils/getData')
const {BadRequest, ConflictRequest, Unauthorize, IntervelServer} = require('../utils/errResponse.utils')
const {generateTokenPair} = require('../utils/generateTokensPair')

class AuthService{
  static async googleAuth(email){
    const foundUser = await userModel.findOne({email})

    //generateKey
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
    })
    const tokens = await generateTokenPair({id: foundUser._id, email}, privateKey)
    if(!tokens) throw new IntervelServer('Someting went wrong - Server Error')
    return {
      user: getData({
        object: foundUser,
        fields: ['_id', 'username', 'email', 'avatar'],
      }),
      tokens
    };
  }
}

module.exports = AuthService