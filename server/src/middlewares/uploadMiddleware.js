const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({storage, fileFilter})

module.exports = upload
