const User = require('../models/user.model');
const Post = require('../models/post.model');
const { getData } = require('../utils/getData');
const { checkCloudinary } = require('../utils/index');
const { ObjectId } = require('mongoose').Types;
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
const cloudinary = require('../config/cloudinary');
class UserService {
  static async getUserInfo(id) {
    if (!id) throw BadRequest('Invalid id');
    const userProfile = await User.findOne(
      { _id: id },
      '_id username name email avatar bio links joinDate skills location work education'
    )
      .populate('followedTags')
      .populate({
        path: 'posts',
        select: '_id title image date url tags likes comments bookmarks author',
        populate: [
          { path: 'author', select: '_id name username avatar' },
          { path: 'tags', select: '_id name' },
        ],
      })
      .populate('comments');

    if (!userProfile) throw ConflictRequest('user do not exist');
    return userProfile;
  }

  static async editProfile(
    id,
    name,
    username,
    file,
    links,
    location,
    bio,
    skills,
    education,
    work
  ) {
    console.log({
      id,
      name,
      username,
      file,
      links,
      location,
      bio,
      skills,
      education,
      work,
    });
    if (!id) throw new BadRequest('Cant not find provided ID');
    try {
      if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        const editedUser = await User.findOneAndUpdate(
          { _id: id },
          {
            name,
            username,
            avatar: result.secure_url,
            links,
            location,
            bio,
            skills,
            education,
            work,
          }
        );
        const newUserProfile = await User.findOne({_id: id})
        if(checkCloudinary(editedUser.avatar)){
          const publicId = editedUser.image.match(/\/([^/]+)$/)[1].split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        }
        return getData({
          object: newUserProfile,
          fields: ['_id', 'name', 'username', 'email', 'avatar'],
        });
      } else {
        const editedUser = await User.findOneAndUpdate(
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
          }
        );
        const newUserProfile = await User.findOne({ _id: id });
        return getData({
          object: newUserProfile,
          fields: ['_id', 'name', 'username', 'email', 'avatar'],
        });
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
}

module.exports = UserService;
