const Notification = require('../models/notification.model')
const Comment = require('../models/comment.model')
const { ObjectId } = require('mongoose').Types;

class NotificationService {
  static async getAllNotification(userId) {
    const notifications = await Notification.find({ receiver: userId })
      .sort({ date: 'desc' })
      .populate({ path: 'sender', select: '_id name username avatar' })
      .populate({ path: 'comment', select: '_id body' })
      .populate({ path: 'post', select: '_id title url' })
    return notifications;
  }

  static async likeNotification(senderId, receiverId, postId) {
    if (senderId !== receiverId) {
      const createdNotification = await Notification.create({
        type: 'like',
        sender: new ObjectId(senderId),
        receiver: new ObjectId(receiverId),
        post: new ObjectId(postId),
      });
    }
    return;
  }

  static async removeLikeNotification(senderId, receiverId, postId) {
    if (senderId !== receiverId) {
      await Notification.findOneAndDelete({
        type: 'like',
        sender: senderId,
        receiver: receiverId,
        post: postId,
      });
    }
    return;
  }

  static async followNotification(senderId, receiverId) {
    if (senderId != receiverId) {
      await Notification.create({
        type: 'follow',
        sender: senderId,
        receiver: receiverId,
      });
    }
    return;
  }

  static async removeFollowNotification(senderId, receiverId) {
    if (senderId != receiverId) {
      await Notification.findOneAndDelete({
        type: 'follow',
        sender: senderId,
        receiver: receiverId,
      });
    }
    return;
  }

  static async commentNotification(senderId, receiverId, commentId) {
    if (senderId != receiverId) {
      await Notification.create({
        type: 'comment',
        sender: senderId,
        receiver: receiverId,
        comment: commentId
      });
    }
    return;
  }

  static async replyNotification(senderId, receiverId, commentId) {
    if (senderId != receiverId) {
      await Notification.create({
        type: 'reply',
        sender: senderId,
        receiver: receiverId,
        comment: commentId
      });
    }
    return;
  }
}

module.exports = NotificationService