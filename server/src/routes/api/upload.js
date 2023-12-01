const router = require('express').Router();
const upload = require('../../middlewares/upload.middleware')
const streamifier = require('streamifier')
const cloudinary = require('../../config/cloudinary')
const {getData} = require('../../utils/getData')
const Response = require('../../utils/apiResponse');

router.post('/upload', upload.single('image'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function Upload(req) {
        let result = await streamUpload(req);
      const image = {
        public_id: result.public_id,
        url: result.url,
        width: result.width,
        height: result.height 
      }
        Response.success(res,image, 201, 'Upload image successfully');
    }

    Upload(req);
});

module.exports = router