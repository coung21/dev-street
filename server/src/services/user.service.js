const User = require('../models/user.model');
const Post = require('../models/post.model')
const {getData} = require('../utils/getData')
const { ObjectId } = require('mongoose').Types;
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
class UserService {
  static async getUserInfo(id) {
    if (!id) throw BadRequest('Invalid id');
    const userProfile = await User.findOne({ _id: new ObjectId(id) }).lean();

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

  static async getReadingList(id){
    const readingList = Post.find(
      {bookmarks: id},
      '_id title image date url tags likes comments bookmarks author',
      { sort: { date: -1 } }
    )
      .populate({ path: 'tags', select: '_id name' })
      .populate({ path: 'author', select: '_id name username avatar' });
      return readingList
  }
}

module.exports = UserService;
