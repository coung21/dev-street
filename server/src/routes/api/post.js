const router = require('express').Router();
// const { check } = require('express-validator');
const PostController = require('../../controllers/post.controller')
const upload = require('../../middlewares/upload.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


//unprotected post api
router.get('/post', PostController.getAllPosts)
router.get('/post/:slugUrl', PostController.getPostDetail);
router.get('/post/tags/:tagname', PostController.getPostsByTag);

//protected post api
router.post('/post/new',authMiddleware ,upload.single('image'), PostController.createPost);
router.patch('/post/edit/:postid',authMiddleware ,upload.single('image'), PostController.editPost);

module.exports = router;
