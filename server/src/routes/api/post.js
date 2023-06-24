const router = require('express').Router();
// const { check } = require('express-validator');
const PostController = require('../../controllers/post.controller')
const upload = require('../../middlewares/upload.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


//unprotected post api
router.get('/post', PostController.getAllPosts)

//protected post api
router.use(authMiddleware)
router.post('/post/new', upload.single('image'), PostController.createPost);

module.exports = router;
