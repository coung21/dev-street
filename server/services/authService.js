const User = require('../models/userModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authService = {};

authService.register = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) return { error: 'user has been exist' };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username:username, email:email,password: hashedPassword });
    const accessToken = jwt.sign({ username, email }, process.env.SECRECT_JWT);
    return {accessToken};
  } catch (error) {
    console.log(error.message);
  }
};

authService.login = async (username, password) => {
  try {
    const user = await User.findOne({username: username})
    if(!user) return {err: 'username not found'}
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return {err: 'incorrect password'}
    const accessToken = jwt.sign({ username, password: user.password }, process.env.SECRECT_JWT);
    return { accessToken };
  } catch (error) {
        console.log(error.message);
  }
}

module.exports = authService;
