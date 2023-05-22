const jwt = require('jsonwebtoken');
const keyTokenModel = require('../models/keyToken.model');
const { Unauthorize } = require('../utils/errResponse.utils');
const Response = require('../utils/apiResponse')

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userId = req.headers['x-client-id'];
    if (!accessToken || !userId) throw new Unauthorize('Unauthorize');

    const userToken = await keyTokenModel.findOne({ user: userId });
    const publicKey = userToken.publicKey;
    const decode = await jwt.verify(accessToken, publicKey);
    req.id = decode.id;
    next();
  } catch (error) {
    return Response.fail(res, 401, 'Unauthorize')
  }
};

module.exports = verifyToken;
