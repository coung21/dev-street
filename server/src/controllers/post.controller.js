const Response = require('../utils/apiResponse');
const PostService = require('../services/post.service');
class PostController {
  static async getAllPosts(req, res) {
    try {
      const allPost = await PostService.getAllPost();
      return Response.success(res, allPost, 200, 'Get All Posts Successfully');
      // return res.json(allPost)
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  static async createPost(req, res) {
    try {
      const { body, title, tags, author } = req.body;
      const tagsArray = tags.split(',');
      const file = req.file;
      const newPost = await PostService.CreatePost(
        file,
        title,
        body,
        tagsArray,
        author
      );
      // console.log(newPost)
      return Response.success(res, newPost, 201, 'Create Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }

  static async editPost(req, res){
try {
  const { postid } = req.params;
  const {body, title, tags, author } = req.body;
  const tagsArray = tags.split(',');
  const file = req.file;
  const editedPost = await PostService.editPost(
    postid,
    file,
    title,
    body,
    tagsArray,
    author
  );
  return Response.success(res, editedPost, 201, 'Edit Post Successfully');
} catch (error) {
  return Response.fail(res, error.status, error.message);
}
  }

  static async getPostDetail(req, res) {
    try {
      const { slugUrl } = req.params;
      const post = await PostService.getPostDetail(slugUrl.trim());
      return Response.success(res, post, 200, 'Find Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async getPostsByTag(req, res) {
    try {
      const { tagname } = req.params;
      const posts = await PostService.getPostsByTag(tagname);
      return Response.success(res, posts, 200, 'Find Post By Tag Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async deletePost(req, res){
    try {
      const {userid, postid} = req.query
      console.log(userid, postid)
      const deletedPost = await PostService.deletePost(userid, req.id, postid)
      return Response.success(res, deletedPost, 200, 'Delete Post By Tag Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
}

module.exports = PostController;
