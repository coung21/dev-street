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
}

module.exports = TagController