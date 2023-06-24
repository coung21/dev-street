const mongoose = require('mongoose');

const DOCCUMENT = 'Comment';
const COLLECTION = 'comments';

const commentSchema = new mongoose.Schema(
  {
    body: {type: String, require: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now() },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DOCCUMENT,
      allowNull: true,
      default: null,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: COLLECTION }
);



module.exports = mongoose.model(DOCCUMENT, commentSchema, COLLECTION);