const mongoose = require('mongoose');

const COLLECTION = 'users';
const DOCUMENT = 'User';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, allowNull: true, default: null },
    avatar: { type: String },
    provider: { type: String, enum: ['Email', 'Google', 'Facebook'] },
    googleId: { type: String, unique: true },
  },
  {
    collection: COLLECTION,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT, userSchema);
