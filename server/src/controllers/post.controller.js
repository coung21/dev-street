const Response = require('../utils/apiResponse')
const PostService = require('../services/post.service')
class PostController {
  static async getAllPosts(req, res){
    try {
      const allPost = await PostService.getAllPost()
      return Response.success(res, allPost, 200, 'Get All Posts Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
  static async createPost(req, res){
    try {
      const {body, title, tags, author} = req.body
      const tagsArray = tags.split(',')
      const file = req.file
      const newPost = await PostService.CreatePost(file, title, body, tagsArray, author)
      // console.log(newPost)
      return Response.success(res, newPost, 201, 'Create Post Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message)
    }
  }
}

module.exports = PostController