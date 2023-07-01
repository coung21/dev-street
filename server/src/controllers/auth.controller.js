const fs = require('fs');
const path = require('path');
const Response = require('../utils/apiResponse');
const AuthService = require('../services/auth.service');

class AuthController {
  //SIGN UP
  static async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.signUp(email, password);
      return Response.success(res, '', 201, response);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //VERIFY EMAIL
  static async verifyEmail(req, res) {
    try {
      const { email, code } = req.query;
      await AuthService.verifyEmail(email, code);
      const template = path.join('src', 'template', 'successfulSignup.html');
      const emailTemplate = fs.readFileSync(template, 'utf8');
      res.setHeader('Content-type', 'text/html');
      return res.send(emailTemplate);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //SIGN IN
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.signIn(email, password);

      const options = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Hết hạn sau 7 ngày
      };

      res.cookie('accessToken', user.tokens.accessToken, options);
      res.cookie('refreshToken', user.tokens.refreshToken, options);
      res.cookie('userId', user.user._id, options);
      return Response.success(res, user.user, 200, 'Sign in successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //FORGOT PASS
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const response = await AuthService.ForgotPassword(email);
      return Response.success(res, '', 200, response);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //RESET PASS
  static async resetPassword(req, res) {
    try {
      const response = await AuthService.ResetPassword(
        req.body.newPassword,
        req.params.token
      );
      return Response.success(res, '', 200, response);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //GOOGLE AUTH
  static async googleAuth(req, res) {
    try {
      const reqData = {
        id: req.user.googleId,
        name: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
      };
      
      const user = await AuthService.googleAuth(reqData.email);
      const options = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Hết hạn sau 7 ngày
      };

      res.cookie('accessToken', user.tokens.accessToken, options);
      res.cookie('refreshToken', user.tokens.refreshToken, options);
      res.cookie('userId', user.user._id, options);
      return Response.success(res, user.user, 200);
      // return res.redirect(
      //   `http://localhost:5173/`
      // );
     
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async logOut(req, res) {
    try {
      const response = await AuthService.logOut(req.id);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.clearCookie('userId');
      res.clearCookie('connect.sid')
      console.log('logedout')
      return Response.success(res, '', 200, response);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async newToken(req, res) {
    try {
      const userId = req.cookies.userId;
      const newToken = await AuthService.newToken(userId);
      const options = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Hết hạn sau 7 ngày
      };
      res.cookie('accessToken', newToken.accessToken, options);
      res.cookie('refreshToken', newToken.refreshToken, options);
      return res.send('got new token')
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
}

module.exports = AuthController;
