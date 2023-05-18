const Response = require('../utils/apiResponse')
const AuthService = require('../services/auth.service')

class AuthController {
  //SIGN UP
  static async SignUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const response = await AuthService.SignUp(username, email, password);
      return Response.success(res, '', 200, response);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  //VERIFY EMAIL
  static async VerifyEmail(req, res) {
    try {
      const {email, code} = req.query
      const response = await AuthService.verifyEmail(email, code)
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
      return Response.success(res, user, 200);
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
}


module.exports = AuthController