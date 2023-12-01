const Response = require('../utils/apiResponse');
const TagService = require('../services/tag.service')

class TagController{
  static async getAllTag(req, res){
    try {
      const allTag = await TagService.getAllTag()
      return Response.success(res, allTag, 200, 'Get All Tag Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  
  static async getFollowTag(req, res){
    try {
      const {id} = req.params
      const tags = await TagService.getFollowTag(id)
      return Response.success(res, tags, 200, 'Get Follow Tag Successfully');
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }

  static async followTag(req, res){
    try {
      const {userId, tagId} = req.body
      const tag = await TagService.followTag(tagId, userId)
      return Response.success(res, tag, 200, 'Follow Tag Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  
  static async unFollowTag(req, res){
    try {
      const { userId, tagId } = req.body;
      const tag = await TagService.unFollowTag(tagId, userId)
      return Response.success(res, tag, 200, 'UnFollow Tag Successfully')
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
  static async seacrchTag(req, res){
    try {
      const { query } = req.query;
      const tags = await TagService.searchTags(query)
      return Response.success(res, tags, 200, '')
    } catch (error) {
      return Response.fail(res, error.status, error.message);
    }
  }
}

module.exports = TagController