const jwt = require('jsonwebtoken');
const keyTokenModel = require('../models/keyToken.model');
const UserModel = require('../models/user.model');
const { Unauthorize } = require('../utils/errResponse.utils');
const Response = require('../utils/apiResponse');

const clientSideSecurity = (req, res, next) => {
  const userId = req.headers.userid;
  const secureUserId = req.cookies.userId;
  if (!userId) {
    return next();
  }
  if (userId !== secureUserId) {
    console.log('xss');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('userId');
    res.clearCookie('connect.sid');
    return Response.fail(res, 403, 'invalid user');
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const userId = req.headers.userid;
  console.log(`\x1b[33m USER::${userId} \x1b[0m`);

  if (!accessToken || !userId) {
    return res.status(403).json({message: 'Unauthorize'})
  }
  
  try {
    const keytoken = await keyTokenModel.findOne({ user: userId });
    if(!keytoken) throw new Error('invalid signature');
    const publicKey = keytoken.publicKey;
    const decodeToken = await jwt.verify(accessToken, publicKey);
    if(decodeToken.id !== userId) throw new Error('invalid signature')
    req.id = decodeToken.id;
    req.role = decodeToken.role
    next();
  } catch (error) {
    if(error.message === 'invalid signature'){
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.clearCookie('userId')
      res.clearCookie('connect.sid');
    }
      return Response.fail(res, 403, error.message)
  }
};

module.exports = { verifyToken, clientSideSecurity };
