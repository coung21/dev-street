const router = require('express').Router();


const BASE_ROUTE = '/v1/api'
//authentication route
router.use(BASE_ROUTE, require('./api/auth'));
//user route
router.use(BASE_ROUTE, require('./api/user'));
//poste router
router.use(BASE_ROUTE, require('./api/post'));

module.exports = router;
