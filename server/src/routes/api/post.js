const router = require('express').Router();
const { check } = require('express-validator');
const upload = require('../../middlewares/upload.middleware');
const cloudinary = require('../../config/cloundinary');
const authMiddleware = require('../../middlewares/auth.middleware');


//unprotected post api

//protected post api
// router.use(authMiddleware)
router.post('/new', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file selected');
    }
    const file = req.file
    const {body} = req.body
    console.log(file)
    const result = await cloudinary.uploader.upload(file.path)
    return res.json({imgUrl: result.secure_url, body})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
