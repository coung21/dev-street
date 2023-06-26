const Tag = require('../models/tag.model');
const { getRandomHexColor } = require('../utils/index');
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');

class TagService {
  static async findOrCreateTags(tagNames) {
    const TagList = [];
    console.log('reach')

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

  static async getAllTag(){
    const allTag = await Tag.find()
    return allTag
  }
}

module.exports = TagService;
