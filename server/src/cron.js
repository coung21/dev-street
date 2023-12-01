const cron = require("node-cron");
const Post = require("./models/post.model");

// Lên lịch kiểm tra mỗi phút
const postScheduleTask = cron.schedule("* * * * *", async () => {
  const now = new Date();

  const postsToPublish = await Post.find({ publishedAt: { $lte: now } });

  postsToPublish.forEach(async (post) => {
    post.published = true;
    post.publishedAt = null;
    await post.save();
    console.log(`published post: ${post._id}`);
  });
});

module.exports = { postScheduleTask };
