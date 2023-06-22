const router = require('express').Router();
// const { check } = require('express-validator');
const PostController = require('../../controllers/post.controller')
const upload = require('../../middlewares/upload.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


//unprotected post api

//protected post api
router.use(authMiddleware)
router.post('/new', upload.single('image'), PostController.createPost);

module.exports = router;
