const keyTokenModel = require('../models/keyToken.model')

class keyTokenService{
  static async createKeyToken(id, refreshToken, publicKey, privateKey){
    await keyTokenModel.findOneAndUpdate(
      {user: id},
      {user: id, refreshToken, publicKey, privateKey},
      {new: true, upsert: true}
    )
  }
  static async delKeyToken (id){
    await keyTokenModel.deleteOne({user: id})
  }
}

module.exports = keyTokenService