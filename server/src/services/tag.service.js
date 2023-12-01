const Tag = require('../models/tag.model');
const User = require('../models/user.model');
const { getRandomHexColor } = require('../utils/index');
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');
const tagModel = require('../models/tag.model');

class TagService {
  static async searchTags(query){
    const tags = await tagModel.find({name: {$regex: query, $options: "i"}}).limit(10)
    return tags
  } 

  static async findOrCreateTags(tagNames) {
    const TagList = [];
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName, theme: getRandomHexColor() });
      }

      TagList.push(tag._id);
    }
    return TagList;
  }

  static async updateTagsPost(tagsId, postId) {
    await Tag.updateMany(
      { _id: { $in: tagsId } },
      { $push: { posts: postId } }
    );
  }

  static async deleteTagsPost(postId) {
    await Tag.updateMany(
      { posts: postId},
      { $pull: { posts: postId } }
    );
  }


  static async getAllTag(){
    const allTag = await Tag.find()
    return allTag
  }

  static async followTag(tagId, userId){
    try {
      const tag = await Tag.findByIdAndUpdate(tagId, {$addToSet: {followers: userId}}, {new: true})
      const user = await User.findByIdAndUpdate(userId, {$addToSet: {followedTags: tagId}})
      return tag
    } catch (error) {
      throw new BadRequest('Can not follow tag')
    }
  }
  static async unFollowTag(tagId, userId){
    try {
      const tag = await Tag.findByIdAndUpdate(tagId, {$pull: {followers: userId}}, {new: true})
      const user = await User.findByIdAndUpdate(userId, {$pull: {followedTags: tagId}})
      return tag
    } catch (error) {
      throw new BadRequest('Can not follow tag')
    }
  }

  static async getFollowTag(userId){
    try {
      const tags = await Tag.find({followers: userId})
      return tags
    } catch (error) {
      throw new BadRequest('Can not get following tag');
    }
  }
}

module.exports = TagService;
