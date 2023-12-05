const router = require('express').Router();
const AdminController = require('../../controllers/admin.controller')
const {verifyToken} = require('../../middlewares/auth.middleware')

router.get('/admin/post/today', AdminController.NewPostEachDay)
router.get('/admin/user/today', AdminController.NewUserEachDay)
router.get('/admin/user', AdminController.GetAllUser)
router.get('/admin/tag', AdminController.ListAllTags)
router.post('/admin/newtag', AdminController.CreateTag)

module.exports = router;
