const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const { ObjectId } = require('mongoose').Types;
const TagService = require('./tag.service');
const cloudinary = require('../config/cloudinary');
const { urlStringConvert } = require('../utils/index');
const NotificationService = require('./notification.service')
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');

class PostService {
  static async getAllPost() {
    const allPost = await Post.find(
      {},
      '_id title image date url tags likes comments bookmarks author',
      { sort: { date: -1 } }
    )
      .populate({ path: 'tags', select: '_id name' })
      .populate({ path: 'author', select: '_id name username avatar' });
    return allPost;
  }
  static async CreatePost(file, title, body, tags, author) {
    if (!file) throw new BadRequest('No file selected');
    const result = await cloudinary.uploader.upload(file.path);
    const tagList = await TagService.findOrCreateTags(tags);
    const newPost = await Post.create({
      title,
      body,
      url: urlStringConvert(title),
      image: result.secure_url,
      tags: [...tagList],
      author: new ObjectId(author),
    });
    await TagService.updateTagsPost(newPost.tags, newPost._id);
    const foundAuthor = await User.findById(author);
    if (!foundAuthor)
      throw new ConflictRequest('Could not find user by provided ID');
    foundAuthor.posts.push(newPost._id);
    foundAuthor.save();
    return newPost;
  }

  static async editPost(id, file, title, body, tags, author) {
    if (!id) throw new BadRequest('Cant not find provided ID');
    try {
      if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        const tagList = await TagService.findOrCreateTags(tags);
        const editedPost = await Post.findOneAndUpdate(
          { _id: id },
          {
            title,
            body,
            url: urlStringConvert(title),
            image: result.secure_url,
            tags: [...tagList],
          }
        );
        const publicId = editedPost.image.match(/\/([^/]+)$/)[1].split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } else {
        const tagList = await TagService.findOrCreateTags(tags);
        await Post.findOneAndUpdate(
          { _id: id },
          {
            title,
            body,
            url: urlStringConvert(title),
            tags: [...tagList],
          }
        );  
      }
    } catch (error) {
      throw new BadRequest('Can not edit post');
    }
  }

  static async getPostDetail(slugUrl) {
    if (!slugUrl) throw new BadRequest('NO SUCH URL');
    const foundPost = await Post.findOne({ url: slugUrl })
      .populate('comments')
      .populate('tags')
      .populate({ path: 'author', select: '_id name username avatar' });
    if (!foundPost) throw new BadRequest('POST FOUND ERROR');
    return foundPost;
  }

  static async getPostsByTag(tagname) {
    const foundPosts = await Post.find(
      {},
      '_id title image date url tags likes comments bookmarks author',
      { sort: { date: -1 } }
    )
      .populate({ path: 'tags', select: '_id name theme' })
      .populate({ path: 'author', select: '_id name username avatar' });
    const filteredPost = foundPosts.filter((post) => {
      return post.tags.some((tag) => tag.name === tagname);
    });

    if (filteredPost < 1) throw new BadRequest('Tag name error');
    return filteredPost;
  }

  static async deletePost(userId, secure_id, postId){
    if(userId === secure_id){
      const deletedPost = await Post.findOneAndDelete({_id: postId}, {new: true})
      const publicId = deletedPost.image.match(/\/([^/]+)$/)[1].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
      await TagService.deleteTagsPost(deletedPost._id)
      await User.updateOne({_id: userId, posts: postId}, {$pull: {posts: postId}})
      //more
    } else {
      throw new BadRequest('Can not delete post')
      // return 'error'
    }
  }

  static async likePost(userId, postId){
    const foundPost = await Post.findOne({_id: postId})
    if(!foundPost) throw new BadRequest('Can not like post')
    foundPost.likes.push(new ObjectId(userId))
    await foundPost.save()
    if(!foundPost.author.equals(userId)){
      await NotificationService.likeNotification(userId, foundPost.author, postId)
    }
    return foundPost
  }

  static async unlikePost(userId, postId){
    const foundPost = await Post.findOne({_id: postId, likes: userId})
    if (!foundPost) throw new BadRequest('Can not unlike post');
    foundPost.likes = foundPost.likes.filter(user => !user.equals(userId))
    await foundPost.save();
    if(!foundPost.author.equals(userId)){
      await NotificationService.removeLikeNotification(userId, foundPost.author, postId)
    }
    return foundPost
  }

  static async bookmarkPost(userId, postId){
    const foundPost = await Post.findOne({ _id: postId })
    if (!foundPost) throw new BadRequest('Can not bookmark post');
    foundPost.bookmarks.push(new ObjectId(userId))
    const bookmarkedUser = await User.findOne({_id: userId})
    bookmarkedUser.bookmarked.push(new ObjectId(postId))
    await foundPost.save()
    await bookmarkedUser.save()
    return foundPost
  }
  static async unbookmarkPost(userId, postId){
    const foundPost = await Post.findOne({ _id: postId })
    if (!foundPost) throw new BadRequest('Can not bookmark post');
    foundPost.bookmarks = foundPost.bookmarks.filter(user => !user.equals(userId))
    const bookmarkedUser = await User.findOne({_id: userId})
    bookmarkedUser.bookmarked = bookmarkedUser.bookmarked.filter(post => !post.equals(postId))
    await foundPost.save()
    await bookmarkedUser.save()
    return foundPost
  }
}

module.exports = PostService;
