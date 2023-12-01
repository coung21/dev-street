const Response = require('../utils/apiResponse');
const AdminService = require('../services/admin.service');


class AdminController{
    static async  NewPostEachDay(req, res) {
        try {
            const response = await AdminService.NewPostEachDay()
            return Response.success(res, response, 200, '');
          } catch (error) {
            return Response.fail(res, error.status, error.message);
          }
    }
    static async  NewUserEachDay(req, res) {
        try {
            const response = await AdminService.NewUserEachDay()
            return Response.success(res, response, 200, '');
          } catch (error) {
            return Response.fail(res, error.status, error.message);
          }
    }
    static async  GetAllUser(req, res) {
        try {
            const response = await AdminService.getAllUser()
            return res.status(200).json(response)
          } catch (error) {
            return Response.fail(res, error.status, error.message);
          }
    }

    static async CreateTag(req, res) {
      try {
        const response = await AdminService.Createtag(req.body.name, req.body.theme)
        return Response.success(res, response, 200, '');
      } catch (error) {
        return Response.fail(res, error.status, error.message);
      }
    }
}

module.exports = AdminController