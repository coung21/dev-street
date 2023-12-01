const router = require('express').Router();

const BASE_ROUTE = '/v1/api'



//authentication route
router.use(BASE_ROUTE, require('./api/auth'));
//user route
router.use(BASE_ROUTE, require('./api/user'));
//post router
router.use(BASE_ROUTE, require('./api/post'));
//tag router
router.use(BASE_ROUTE, require('./api/tag'))

router.use(BASE_ROUTE, require('./api/upload'))

router.use(BASE_ROUTE, require('./api/admin'))

module.exports = router;
