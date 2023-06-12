const jwt = require('jsonwebtoken');
const keyTokenModel = require('../models/keyToken.model');
const UserModel = require('../models/user.model');
const { Unauthorize } = require('../utils/errResponse.utils');
const Response = require('../utils/apiResponse');

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const userId = req.cookies.userId;

  console.log(userId)

  if (!accessToken || !userId) {
    return res.status(403).json({message: 'Unauthorize'})
  }

  const keytoken = await keyTokenModel.findOne({ user: userId });
  const publicKey = keytoken.publicKey;

  try {
    const decodeToken = await jwt.verify(accessToken, publicKey);
    req.id = decodeToken.id;
    next();
  } catch (error) {
    if(error.message === 'invalid signature'){
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.clearCookie('userId')
    }
      return Response.fail(res, 403, error.message)
  }
};

module.exports = verifyToken;
