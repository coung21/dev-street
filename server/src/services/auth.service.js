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
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('../helpers/emailSender');
const keyTokenService = require('./keyToken.service')

class AuthService {
  //SIGNUP
  static async SignUp(username, email, password) {
    const foundUser = await userModel.findOne({ email });
    if (foundUser) throw new ConflictRequest('This email already exist');

    const verificationCode = Math.random().toString(36).substring(2, 8);
    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (error) {
      throw new BadRequest('This email is not exist')
    }
    await userModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      verificationCode,
    });

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
    }
  }

  //SIGN IN
  static async SignIn(email, password) {
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      throw new ConflictRequest('This account is not exist');
    } else if (foundUser.isVerify === false) {
      throw new BadRequest('Your account is not be verified');
    } else if (foundUser.provider !== 'Email') {
      throw new BadRequest(
        `This email address is already in use using ${foundUser.provider} provider.`
      );
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) throw new BadRequest('Password incorrect');

    //generate keys
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
    await keyTokenService.createKeyToken(foundUser._id, tokens.refreshToken,  publicKey,privateKey)
    return {
      user: getData({
        object: foundUser,
        fields: ['_id', 'username', 'email', 'avatar'],
      }),
      tokens,
    };
  }

  //FORGOT PASSWORD
  static async ForgotPassword(email) {
    if (!email) throw new BadRequest('You have to enter your email');

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      throw new BadRequest('No user found for this email address.');
    } else if (existingUser.provider !== 'Email') {
      throw new ConflictRequest(
        `This email address is already in use using ${foundUser.provider} provider.`
      );
    }

    const resetToken = crypto.randomBytes(3).toString('hex');

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + 600000;
    existingUser.save();

    sendResetPasswordEmail(email, resetToken);
    return 'Please check your email for the OTP to reset your password.';
  }

  //RESET PASSWORD
  static async ResetPassword(password, token) {
    if (!password) throw new BadRequest('You have to enter new password');

    const resetUser = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!resetUser)
      throw new BadRequest(
        'Your token has expired. Please attempt to reset your password again.'
      );

    const hashPassword = await bcrypt.hash(password, 10);

    resetUser.password = hashPassword;
    resetUser.resetPasswordToken = null;
    resetUser.resetPasswordExpires = null;
    resetUser.save();

    return 'Password changed successfully. Please login with your new password.';
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

  // LOGOUT
  static async LogOut(id){
    if(!id) throw new Unauthorize('Invalid request')
    await keyTokenService.delKeyToken(id)
    return 'Log out successfully'
  }
}

module.exports = AuthService;
