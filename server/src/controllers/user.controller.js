const Response = require('../utils/apiResponse')
const UserService = require('../services/user.service')
const NotificationService = require('../services/notification.service')

class UserController {
  //Get User Profile
  static async getUser(req, res){
    try {
      const {id} = req.params
      const user = await UserService.getUserInfo(id)
      return Response.success(res, user, 200, 'Get User Profile Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
  

  static async editUser(req, res){
    try {
      const { id } = req.params;
      const {name, username, links, location, bio, skills, education, work} = req.body;
      const file = req.file
      const newProfile = await UserService.editProfile(id, name, username, file, links, location, bio, skills, education, work)
      return Response.success(res, newProfile, 200, 'Edit User Profile Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
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

  static async followUser(req, res){
    try {
      const {followerid, userid} = req.body
      const user = UserService.followUser(followerid, userid)
      return Response.success(res, user, 200, 'Follow User Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
  static async unfollowUser(req, res){
    try {
      const {followerid, userid} = req.body
      const user = UserService.unFollowUser(followerid, userid)
      return Response.success(res, user, 200, 'UnFollow User Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
}

module.exports = UserController