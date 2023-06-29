const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const { ObjectId } = require('mongoose').Types;
const TagService = require('./tag.service');
const cloudinary = require('../config/cloudinary');
const { urlStringConvert } = require('../utils/index');
const { getData } = require('../utils/getData');

const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');

class PostService {
  static async getAllPost() {
    const allPost = await Post.find({},  '_id title image date url tags likes comments bookmarks author', {sort: {date: -1}})
      .populate({ path: 'tags', select: '_id name' })
      .populate({ path: 'author', select: '_id name username avatar' });
      return allPost
  }
  static async CreatePost(file, title, body, tags, author) {
    if (!file) throw new BadRequest('No file selected');
    const result = await cloudinary.uploader.upload(file.path);
    const tagList = await TagService.findOrCreateTags(tags);
    console.log(tagList)
    const newPost = await Post.create({
      title,
      body,
      url: urlStringConvert(title),
      image: result.secure_url,
      tags: [...tagList],
      author: new ObjectId(author),
    });
    await TagService.updateTagsPost(newPost.tags, newPost._id)
    return newPost;
  }

  static async getPostDetail(slugUrl){
    if(!slugUrl) throw BadRequest('NO SUCH URL')
    const foundPost = await Post.findOne({ url: slugUrl })
      .populate('comments')
      .populate('tags')
      .populate({ path: 'author', select: '_id name username avatar' });
      console.log(slugUrl)
    if(!foundPost) throw ConflictRequest('POST FOUND ERROR')
    return foundPost
  }
}

module.exports = PostService;
