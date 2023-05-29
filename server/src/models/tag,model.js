const mongoose = require('mongoose');

const DOCCUMENT = 'Tag';
const COLLECTION = 'tags';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, {collection: COLLECTION});

module.exports = mongoose.model(DOCCUMENT, tagSchema); //returns a constructor function
