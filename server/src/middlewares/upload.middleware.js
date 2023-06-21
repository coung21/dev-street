const multer = require('multer');
const path = require('path')
const fs = require('fs')


const imageDir = path.join(__dirname, '..', 'assets', 'images')
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
} //checking write permission
// else {
//   try {
//     fs.accessSync(imageDir, fs.constants.W_OK);
//     console.log('Thư mục có quyền ghi.');
//   } catch (err) {
//     console.error('Thư mục không có quyền ghi.');
//   }
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    req.file = file
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({fileFilter, storage})


module.exports = upload
