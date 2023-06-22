const Response = require('../utils/apiResponse')
const PostService = require('../services/post.service')
class PostController {
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