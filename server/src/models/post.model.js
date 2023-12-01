const mongoose = require('mongoose');
const imageSchema = require('./image.model')


const DOCUMENT = 'Post';
const COLLECTION = 'posts';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    cover: {type: imageSchema},
    body: { type: String, require: true },
    url: {type: String, require: true},
    date: { type: Date, default: Date.now() },
    publishedAt: {type: Date, default: null,  allowNull: true },
    published: {type: Boolean, require: true},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  },
  {
    collection: COLLECTION,
  }
);

module.exports = mongoose.model(DOCUMENT, postSchema);
