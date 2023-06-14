const userModel = require('../models/user.model');
const {getData} = require('../utils/getData')
const { ObjectId } = require('mongoose').Types;
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
class UserService {
  static async getUserInfo(id) {
    if (!id) throw BadRequest('Invalid id');
    const userProfile = await userModel.findOne({ _id: new ObjectId(id) }).lean();

    if (!userProfile) throw ConflictRequest('user do not exist');
    return getData({
      object: userProfile,
      fields: [
        '_id',
        'username',
        'name',
        'email',
        'avatar',
        'bio',
        'links',
        'joinDate',
        'skills',
        'location',
        'work',
        'education',
        'posts',
        'comments',
        'followers',
        'following',
        'followedTags',
        'bookmarked',
      ],
    });
  }

  static async editProfile(id) {}
}

module.exports = UserService;
