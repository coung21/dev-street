const Tag = require('../models/tag.model');
const { BadRequest, ConflictRequest } = require('../utils/errResponse.utils');

class TagService {
  static async findOrCreateTags(tagNames) {
    const TagList = [];

    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }

      TagList.push(tag._id);
    }

    return TagList;
  }
}

module.exports = TagService;
