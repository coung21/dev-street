const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userModel = require('../models/user.model');
const {resizeProfilePicture, englishSUserNameFormatter} = require('../utils/index') 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: `/v1/api${process.env.CALLBACK_URL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      //save to database
      const UserData = {
        id: profile.id,
        username: englishSUserNameFormatter(profile.displayName),
        name: profile.family_name || profile.displayName,
        email: profile.email,
        avatar: resizeProfilePicture(profile.picture, 200),
      };

      //if user was exist
      const user = await userModel.findOne({ email: UserData.email });
      if (user) return done(null, user);

      //save new visitor to database
      const newUser = await userModel.create({
        username: UserData.username,
        email: UserData.email,
        name: UserData.name,
        avatar: UserData.avatar,
        provider: 'Google',
        googleId: UserData.id,
      });

      if (!newUser) return done(err, false);
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

module.exports = passport;
