const User = require('../models/user.model');
const Post = require('../models/post.model');
const { getData } = require('../utils/getData');
const { checkCloudinary } = require('../utils/index');
const { ObjectId } = require('mongoose').Types;
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
const cloudinary = require('../config/cloudinary');
const NotificationService = require('./notification.service');
class UserService {
  static async getUserInfo(id) {
    if (!id) throw BadRequest('Invalid id');
    const userProfile = await User.findOne(
      { _id: id },
      '_id username name email avatar bio links joinDate skills location work theme education followers following'
    )
      .populate('followedTags')
      .populate({
        path: 'posts',
        select: '_id title image date url publishedAt published tags likes comments bookmarks author',
        populate: [
          { path: 'author', select: '_id name username avatar' },
          { path: 'tags', select: '_id name' },
        ],
        options: {sort: {date: -1}}
      })
      .populate('comments');

    if (!userProfile) throw ConflictRequest('user do not exist');
    return userProfile;
  }

  static async editProfile(
    id,
    name,
    username,
    avatar,
    links,
    location,
    bio,
    skills,
    education,
    work,
    theme
  ) {
    if (!id) throw new BadRequest('Cant not find provided ID');
    try {
      if (avatar) {
        const editedUser = await User.findOneAndUpdate(
          { _id: id },
          {
            name,
            username,
            avatar,
            links,
            location,
            bio,
            skills,
            education,
            work,
            theme
          }
        );
        if (editedUser.avatar.public_id) {
          publicId = editedUser.avatar.public_id
          await cloudinary.uploader.destroy(publicId);
        }
        const newUserProfile = await User.findOne(
          { _id: id },
          '_id name username email avatar theme'
        );
        return newUserProfile;
      } else {
        await User.findOneAndUpdate(
          { _id: id },
          {
            name,
            username,
            links,
            location,
            bio,
            skills,
            education,
            work,
            theme
          }
        );
        const newUserProfile = await User.findOne(
          { _id: id },
          '_id name username email avatar'
        );
        return newUserProfile;
      }
    } catch (error) {
      throw new BadRequest('Can not edit profile');
    }
  }

  static async getReadingList(id) {
    const readingList = Post.find(
      { bookmarks: id },
      '_id title image date url tags likes comments bookmarks author',
      { sort: { date: -1 } }
    )
      .populate({ path: 'tags', select: '_id name' })
      .populate({ path: 'author', select: '_id name username avatar' });
    return readingList;
  }

  static async followUser(followerId, userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: new ObjectId(followerId) } },
        { new: true }
      );
      const followerUser = await User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: userId } },
        { new: true }
      );
      await NotificationService.followNotification(followerId, userId);
      return user;
    } catch (error) {
      throw new BadRequest('Follow failed, please try it again');
    }
  }

  static async unFollowUser(followerId, userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { followers: followerId } },
        { new: true }
      );
      const unFollowerUser = await User.findByIdAndUpdate(
        followerId,
        { $pull: { following: userId } },
        { new: true }
      );
      await NotificationService.removeFollowNotification(followerId, userId);
      return user;
    } catch (error) {
      throw new BadRequest('Follow failed, please try it again');
    }
  }
}

module.exports = UserService;
