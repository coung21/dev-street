const dotenv = require('dotenv');
dotenv.config()
const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const {User} = require('../models/userModal')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT,
};

passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (error) {
    done(error, false)
  }
}))

module.exports = passport