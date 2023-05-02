const jwt = require('jsonwebtoken')
const passport = require('passport')

const authenticateMiddleware = passport.authenticate('jwt', {session: false})

// const authenticateMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
//       if (error){
//         if(error.name === 'TokenExpiredError'){
//           res.status(401).json('TokenExpired')
//         } else {
//           res.status(403).json('token is not valid')
//         }
//       } 
//     });
//     next();
//   } else {
//     return res.status(403).json('you are not authenticated');
//   }
// };

module.exports = authenticateMiddleware