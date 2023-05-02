const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
}, {timestamps: true})

const userSecuritySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    // ref: 'User'
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: true
  },
  token_identifier: {
    type: String,
    require: true
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema, 'users')
const userSecurity = mongoose.model('User_Security', userSecuritySchema, 'user_security')

module.exports = {
  User,
  userSecurity
}