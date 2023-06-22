const Post = require('../models/post.model')
const { ObjectId } = require('mongoose').Types;
const TagService = require('./tag.service')
const cloudinary = require('../config/cloudinary');
const {urlStringConvert} = require('../utils/index')

const {BadRequest, ConflictRequest} = require('../utils/errResponse.utils')

class PostService{
  static async CreatePost(file, title, body, tags, author){
    if(!file) throw new BadRequest('No file selected')
    const result = await cloudinary.uploader.upload(file.path);
    const tagList = await TagService.findOrCreateTags(tags)
    const newPost = await Post.create({
      title,
      body,
      url: urlStringConvert(title),
      image: result.secure_url,
      tags: [...tagList],
      author: new ObjectId(author),
    });
    return newPost
  }
}

module.exports = PostService