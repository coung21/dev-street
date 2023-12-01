const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const { ObjectId } = require('mongoose').Types;
const TagService = require('./tag.service');
const cloudinary = require('../config/cloudinary');
const { urlStringConvert } = require('../utils/index');
const NotificationService = require('./notification.service');
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
const tagModel = require('../models/tag.model');

class PostService {
  static async getAllPost(page, limit = 5) {
    const skip = (page - 1) * limit
    const allPost = await Post.find(
      {published: true},
      '_id title cover date url tags likes comments bookmarks author',
      { sort: { date: -1 } }
    )
      .populate({ path: 'tags', select: '_id name' })
      .populate({ path: 'author', select: '_id name username avatar' })
      .skip(skip)
      .limit(limit);
    return allPost;
  }

  static async CreatePost(cover, title, body, tags, author, publishedAt) {
    if (!cover) throw new BadRequest('No file selected');
    // const result = await cloudinary.uploader.upload(file.path);
    const newPost = await Post.create({
      title,
      body,
      url: urlStringConvert(title),
      cover,
      tags: [...tags],
      author: new ObjectId(author),
      publishedAt,
      published: !publishedAt ? true : false
    });
    await TagService.updateTagsPost(newPost.tags, newPost._id);
    const foundAuthor = await User.findById(author);
    if (!foundAuthor)
      throw new ConflictRequest('Could not find user by provided ID');
    foundAuthor.posts.push(newPost._id);
    foundAuthor.save();

    if(newPost.published){
      await NotificationService.publishNotification(foundAuthor._id, foundAuthor.followers, newPost._id)
    } else {
      await NotificationService.scheduleNotification(foundAuthor._id, foundAuthor.followers, newPost.publishedAt.toString())
    }
    
    return newPost;
  }

  static async editPost(id, cover, title, body, tags, author) {
    if (!id) throw new BadRequest('Cant not find provided ID');
    try {
      const editedPost = await Post.findOneAndUpdate(
        { _id: id },
        {
          title,
          body,
          url: urlStringConvert(title),
          cover,
          tags: [...tags],
        },
      );
      if (cover.public_id !== editedPost.cover.public_id) {
        // const result = await cloudinary.uploader.upload(file.path);
        const publicId = editedPost.cover.public_id;
        await cloudinary.uploader.destroy(publicId);
      }

     tags.map(item => {
      if(!editedPost.tags.includes(item)){
        TagService.updateTagsPost(item, editedPost._id)
      }
     });
      
     editedPost.tags.map(item => {
      if(!tags.includes(item)){
        TagService.deleteTagsPost(editedPost._id)
      }
     })

    } catch (error) {
      throw new BadRequest('Can not edit post');
    }
  }

  static async getPostDetail(slugUrl) {
    if (!slugUrl) throw new BadRequest('NO SUCH URL');
    const foundPost = await Post.findOne({ url: slugUrl })
      .populate('comments')
      .populate('tags')
      .populate({ path: 'author', select: '_id name username avatar bio location education work theme joinDate' });
    if (!foundPost) throw new BadRequest('POST FOUND ERROR');
    return foundPost;
  }

  static async getPostsByTag(tagname, page, limit = 5) {
    const skip = (page - 1) * limit;
  
    // Sử dụng `findOne` để lấy thông tin tag
    const tag = await tagModel.findOne({ name: tagname });
    // Sử dụng `populate` để lọc trực tiếp trong câu truy vấn
    const foundPosts = await Post.find(
      { tags:  tag._id.toString() },
      '_id title cover date url tags likes comments bookmarks author'
    )
      .populate({ path: 'author', select: '_id name username avatar' })
      .populate({ path: 'tags', select: '_id name theme', match: { _id: tag._id } })
      .skip(skip)
      .limit(limit);
      
    return foundPosts;
  }
  
    
  static async deletePost(userId, secure_id, postId) {
    if (userId === secure_id) {
      const deletedPost = await Post.findOneAndDelete(
        { _id: postId },
        { new: true }
      );
      const publicId = deletedPost.cover.public_id;
      await cloudinary.uploader.destroy(publicId);
      await TagService.deleteTagsPost(deletedPost._id);
      await User.updateOne(
        { _id: userId, posts: postId },
        { $pull: { posts: postId } }
      );
      //more
    } else {
      throw new BadRequest('Can not delete post');
      // return 'error'
    }
  }

  static async likePost(userId, postId) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) throw new BadRequest('Can not like post');
    foundPost.likes.push(new ObjectId(userId));
    await foundPost.save();
    if (!foundPost.author.equals(userId)) {
      await NotificationService.likeNotification(
        userId,
        foundPost.author,
        postId
      );
    }
    return foundPost;
  }

  static async unlikePost(userId, postId) {
    const foundPost = await Post.findOne({ _id: postId, likes: userId });
    if (!foundPost) throw new BadRequest('Can not unlike post');
    foundPost.likes = foundPost.likes.filter((user) => !user.equals(userId));
    await foundPost.save();
    if (!foundPost.author.equals(userId)) {
      await NotificationService.removeLikeNotification(
        userId,
        foundPost.author,
        postId
      );
    }
    return foundPost;
  }

  static async bookmarkPost(userId, postId) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) throw new BadRequest('Can not bookmark post');
    foundPost.bookmarks.push(new ObjectId(userId));
    const bookmarkedUser = await User.findOne({ _id: userId });
    bookmarkedUser.bookmarked.push(new ObjectId(postId));
    await foundPost.save();
    await bookmarkedUser.save();
    return foundPost;
  }

  static async unbookmarkPost(userId, postId) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) throw new BadRequest('Can not bookmark post');
    foundPost.bookmarks = foundPost.bookmarks.filter(
      (user) => !user.equals(userId)
    );
    const bookmarkedUser = await User.findOne({ _id: userId });
    bookmarkedUser.bookmarked = bookmarkedUser.bookmarked.filter(
      (post) => !post.equals(postId)
    );
    await foundPost.save();
    await bookmarkedUser.save();
    return foundPost;
  }

  static async getComments(id) {
    if (!id) throw BadRequest('Can not get comments');
    const comments = await Comment.find({ post: id })
      .sort({ date: -1 })
      .populate({
        path: 'author',
        select: '_id name username avatar',
      });
    return comments;
  }

  static async postComment(id, author, body, parent) {
    const comment = await Comment.create({
      body,
      author: new ObjectId(author),
      post: new ObjectId(id),
      parentId: parent ? new ObjectId(parent) : null,
    });
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment._id } },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      { _id: author },
      { $push: { comments: comment._id } },
      { new: true }
    );
    if (!parent) {
      await NotificationService.commentNotification(
        author,
        post.author,
        comment._id
      );
    } else {
      const parentComment = await Comment.findOne({ _id: parent });
      await NotificationService.replyNotification(
        author,
        parentComment.author,
        comment._id
      );
    }
    return comment;
  }

  static async getSearchResults(keyword, page, limit = 5) {
    const skip = (page - 1) * limit
    if (keyword) {
      const query = {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { body: { $regex: keyword, $options: 'i' } },
        ],
      };

      const post = await Post.find(
        query,
        '_id title cover date url tags likes comments bookmarks author'
      )
        .populate({ path: 'tags', select: '_id name' })
        .populate({ path: 'author', select: '_id name username avatar' })
        .skip(skip)
        .limit(limit)
        console.log(post)
        return post;
    }
  }
}

module.exports = PostService;
