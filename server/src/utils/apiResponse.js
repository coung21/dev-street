

class Response{
  static success(res, data, statusCode = 200, message = 'success'){
    return res.status(statusCode).json({message, data})
  }
  static fail(res, statusCode = 500, message ='Error'){
    return res.status(statusCode).json({message})
  }
}


module.exports = Response