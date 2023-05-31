const userModel = require('../models/user.model')
const {BadRequest, ConflictRequest} = require('../utils/errResponse.utils')

class UserService{
  static async getUserInfo(username){
    if(!username) throw BadRequest('Invalid username')
    const userProfile = await userModel.aggregate([
      {$project: {_id: 1, username: 1, name: 1, email: 1, avatar: 1, bio: 1, links: 1, joinDate: 1, skills: 1, location: 1, work: 1, education: 1, posts: 1., comments: 1, followers: 1, following: 1, followedTags: 1, bookmarked: 1}},
      {$match: {username: username}}
    ])
    if(!userProfile) throw ConflictRequest('user do not exist')
    return userProfile
  }
}


module.exports = UserService