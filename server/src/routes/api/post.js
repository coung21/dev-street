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
router.delete('/post/delete', verifyToken, PostController.deletePost)
router.post('/post/like', verifyToken, PostController.likePost)
router.post('/post/unlike', verifyToken, PostController.unlikePost)
router.post('/post/bookmark', verifyToken, PostController.bookmarkPost)
router.post('/post/unbookmark', verifyToken, PostController.unbookmarkPost)

module.exports = router;
