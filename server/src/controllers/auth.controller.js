const Response = require('../utils/apiResponse')
const AuthService = require('../services/auth.service')

class AuthController{
  static async googleAuth(req, res){
    try {
        const reqData = {
          id: req.user.googleId,
          name: req.user.username,
          email: req.user.email,
          avatar: req.user.avatar,
        };

        const user = await AuthService.googleAuth(reqData.email) 
        return Response.success(res, user, 200)
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
}


module.exports = AuthController