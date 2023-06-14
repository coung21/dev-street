const Response = require('../utils/apiResponse')
const UserService = require('../services/user.service')

class UserController {
  //Get User Profile
  static async getUser(req, res){
    try {
      const {id} = req.params
      const user = await UserService.getUserInfo(id)
      return Response.success(res, user, 200, 'success')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
  // static async editProfile(req, res){
  //   try {
  //     const {username} = req.params
  //     const id = req.id
  //     const user = await UserService.
  //     return Response.success(res, user, 200, 'success')
  //   } catch (error) {
  //     return Response.fail(res, error.status, error.message)
  //   }
  // }

}

module.exports = UserController