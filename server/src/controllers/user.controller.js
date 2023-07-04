const Response = require('../utils/apiResponse')
const UserService = require('../services/user.service')
const NotificationService = require('../services/notification.service')

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
  

  static async getUserNotifications(req, res){
    try {
      const {id} = req.params
      const notifications = await NotificationService.getAllNotification(id)
      return Response.success(res, notifications, 200, 'Get All Notifications Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
  
  static async getReadingList(req, res){
    try {
      const {id} = req.params
      const readingList = await UserService.getReadingList(id)
      return Response.success(res, readingList, 200, 'Get Reading List Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
}

module.exports = UserController