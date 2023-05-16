const router = require('express').Router();

//authentication route
router.use('/v1/api', require('./api/auth'));

module.exports = router;
