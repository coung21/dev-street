const router = require('express').Router();
// const { check } = require('express-validator');
const PostController = require('../../controllers/post.controller')
const upload = require('../../middlewares/upload.middleware');
const { verifyToken } = require('../../middlewares/auth.middleware');


//unprotected post api
router.get('/post', PostController.getAllPosts)
router.get('/post/:slugUrl', PostController.getPostDetail);
router.get('/post/tags/:tagname', PostController.getPostsByTag);

//protected post api
router.post('/post/new',verifyToken ,upload.single('image'), PostController.createPost);
router.patch('/post/edit/:postid',verifyToken ,upload.single('image'), PostController.editPost);

module.exports = router;
