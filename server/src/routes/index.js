const router = require('express').Router();

//authentication route
router.use('/v1/api', require('./api/auth'));
//user route
router.use('/v1/api', require('./api/user'));

module.exports = router;
