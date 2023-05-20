const mongoose = require('mongoose');

const COLLECTION = 'users';
const DOCUMENT = 'User';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, allowNull: true, default: null },
    avatar: {
      type: String,
      default: 'https://www.drupal.org/files/issues/default-avatar.png',
    },
    verificationCode: { type: String, allowNull: true },
    isVerify: {
      type: Boolean,
      default: function () {
        return this.provider !== 'Email' ? true : false;
      },
      require: true,
    },
    provider: {
      type: String,
      enum: ['Email', 'Google', 'Facebook'],
      default: 'Email',
    },
    googleId: { type: String },
    resetPasswordToken: { type: String, allowNull: true},
    resetPasswordExpires: {type: Date, allowNull: true},
  },
  {
    collection: COLLECTION,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT, userSchema);
