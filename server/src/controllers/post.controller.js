const Response = require('../utils/apiResponse');
const PostService = require('../services/post.service');
class PostController {
  static async getAllPosts(req, res) {
    try {
      const {page} = req.query
      const allPost = await PostService.getAllPost(page);
      return Response.success(res, allPost, 200, 'Get All Posts Successfully');
      // return res.json(allPost)
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  static async createPost(req, res) {
    try {
      const {title,  body, cover, tags, author, publishedAt } = req.body;
      const newPost = await PostService.CreatePost(
        cover,
        title,
        body,
        tags,
        author,
        publishedAt
      );
      return Response.success(res, newPost, 201, 'Create Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async editPost(req, res) {
    try {
      const { postid } = req.params;
      const { body, title, tags, author, cover } = req.body;
      const editedPost = await PostService.editPost(
        postid,
        cover,
        title,
        body,
        tags,
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
      const { page } = req.query
      const posts = await PostService.getPostsByTag(tagname, page);
      return Response.success(res, posts, 200, 'Find Post By Tag Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async deletePost(req, res) {
    try {
      const { userid, postid } = req.query;
      // console.log(userid, postid);
      const deletedPost = await PostService.deletePost(userid, req.id, postid);
      return Response.success(
        res,
        deletedPost,
        200,
        'Delete Post By Tag Successfully'
      );
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async likePost(req, res) {
    try {
      const { userid, postid } = req.body;
      const likedPost = await PostService.likePost(userid, postid);
      return Response.success(res, likedPost, 200, 'Like Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async unlikePost(req, res) {
    try {
      const { userid, postid } = req.body;
      const unlikedPost = await PostService.unlikePost(userid, postid);
      return Response.success(res, unlikedPost, 200, 'Like Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async bookmarkPost(req, res) {
    try {
      const { userid, postid } = req.body;
      const bookmarkedPost = await PostService.bookmarkPost(userid, postid);
      return Response.success(res, bookmarkedPost, 200, 'Bookmark Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  
  static async unbookmarkPost(req, res) {
    try {
      const { userid, postid } = req.body;
      const unbookmarkedPost = await PostService.unbookmarkPost(userid, postid);
      return Response.success(res, unbookmarkedPost, 200, 'Unbookmark Post Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async getComments(req, res){
    try {
      const {id} = req.params
      const comments = await PostService.getComments(id)
      return Response.success(res, comments, 200, 'Get Comments Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  
  static async postComment(req, res){
    try {
      const {id} = req.params
      const {author, body, parent} = req.body
      const comment = await PostService.postComment(id, author, body, parent)
      return Response.success(res, comment, 201, 'Post Comment Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async getSearchResults(req, res){
    try {
      const keyword = req.query.search;
      const page = req.query.page
      const posts = await PostService.getSearchResults(keyword, page)
      return Response.success(res, posts, 200, 'Get Search Results Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
}

module.exports = PostController;
