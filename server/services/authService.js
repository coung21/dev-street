const {User, userSecurity} = require('../models/userModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {generateAccessToken, generateRefreshToken} = require('../utils/generateToken') 
const randomStr = require('../utils/randomStr')

const authService = {};

authService.register = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) return { error: 'user has been exist' };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username:username, email:email });
    const refreshToken = generateRefreshToken({id: newUser._id})
    const newUserSecurity = await userSecurity.create({userId: newUser._id, password:hashedPassword, refreshToken: refreshToken, token_identifier: randomStr()})
    const accessToken = generateAccessToken({id: newUser._id})
    return {accessToken, token_identifier: newUserSecurity.token_identifier};
  } catch (error) {
    console.log(error.message);
  }
};

authService.login = async (username, password) => {
  try {
    const user = await User.findOne({username: username})
    if(!user) return {err: 'username not found'}
    const userPassword = await userSecurity.findOne({userId: user._id})
    const isPasswordCorrect = await bcrypt.compare(password, userPassword.password)
    if (!isPasswordCorrect) return {err: 'incorrect password'}
    const accessToken = generateAccessToken({id: user._id});
    const refreshToken = generateRefreshToken({id: user._id});
    const userSecurityUpdated = await userSecurity.findOneAndUpdate({userId: user._id}, {$set: {refreshToken: refreshToken, token_identifier: randomStr()}}, {new: true})
    return { accessToken, token_identifier: userSecurityUpdated.token_identifier };
  } catch (error) {
        console.log(error.message);
  }
}

authService.newToken = async (identifier) => {
  const user = await userSecurity.findOne({ token_identifier: identifier });
  try {
    const decoded = jwt.verify(
      user.refreshToken,
      process.env.SECRET_JWT_REFRESH
    );
    const accessToken = generateAccessToken({id: user._id});
    return { accessToken };
  } catch (error) {
    console.log(error);
    throw new Error('Invalid refresh token');
  }
};



module.exports = authService;
