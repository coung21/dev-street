const mongoose = require('mongoose')

const DOCCUMENT = 'tokenKey'
const COLLECTION = 'tokenKeys'

const keyToken = new mongoose.Schema(
  {
    privateKey: {
      type: String,
      require: true,
    },
    publicKey: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
    },
    refreshTokenUsed: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
  },
  {
    collection: COLLECTION,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCCUMENT, keyToken)