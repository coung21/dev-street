

class Response{
  static success(res, data, statusCode = 200, message = 'success'){
    return res.status(statusCode).json({message, status: statusCode, data})
  }
  static fail(res, statusCode = 500, message ='Error'){
    return res.status(statusCode).json({status: statusCode, message})
  }
}


module.exports = Response