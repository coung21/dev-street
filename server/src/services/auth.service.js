const userModel = require('../models/user.model');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { getData } = require('../utils/getData');
const {
  BadRequest,
  ConflictRequest,
  Unauthorize,
  IntervelServer,
} = require('../utils/errResponse.utils');
const { generateTokenPair } = require('../utils/generateTokensPair');
const {sendVerificationEmail} = require('../helpers/emaiSender')

class AuthService {
  //SIGNUP
  static async SignUp(username,email ,password) {
    const foundUser = await userModel.findOne({ email });
    if (foundUser) throw new ConflictRequest('This email already exist');

    const verificationCode = Math.random().toString(36).substring(2, 8);
    await userModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      verificationCode,
    });

    sendVerificationEmail(email, verificationCode);
    return 'A Verification Email Has Been Send For You.';
  }

  //VERIFY EMAIL FOR SIGN UP
  static async verifyEmail(email, verificationCode) {
    const registeredUser = await userModel.findOne({ email });
    console.log(registeredUser);
    if (
      registeredUser &&
      verificationCode === registeredUser.verificationCode
    ) {
      registeredUser.isVerify = true;
      registeredUser.verificationCode = null;
      await registeredUser.save();
      return 'Sign up succesfully';
    }
  }


  //AUTHENTICAION WITH GOOGLE
  static async googleAuth(email) {
    const foundUser = await userModel.findOne({ email });

    //generateKey
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
    const tokens = await generateTokenPair(
      { id: foundUser._id, email },
      privateKey
    );
    if (!tokens) throw new IntervelServer('Someting went wrong - Server Error');
    return {
      user: getData({
        object: foundUser,
        fields: ['_id', 'username', 'email', 'avatar'],
      }),
      tokens,
    };
  }
}

module.exports = AuthService;
