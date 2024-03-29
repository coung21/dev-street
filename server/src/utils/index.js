const unidecode = require('unidecode');
const slugify = require('slugify');
const emoji = require('node-emoji');
const Post = require('../models/post.model')

function resizeProfilePicture(url, size) {
  if (url && url.includes('s96-c')) {
    url = url.replace('s96-c', `s${size}-c`);
  }
  return url;
}

// function urlStringConvert(inputString) {
//   const sanitizedString = inputString.replace(
//     /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu,
//     ''
//   );
//   const trimedString = sanitizedString.trim();
//   const urlFriendlyString = trimedString.replace(/ /g, '-');
//   return (
//     urlFriendlyString + Math.floor(Math.random() * (999 - 1) + 1).toString()
//   );
// }
function chuyenDoiChuoiThanhURL(chuoi) {
  const randomString = Math.random().toString(36).substring(7); // Chuỗi ngẫu nhiên
    const chuoiKhongDau = emoji.unemojify(chuoi); // Chuyển đổi emoji thành dạng có thể đọc được
    const slug = slugify(chuoiKhongDau, {
        replacement: '-', // Sử dụng dấu gạch ngăn cách
        lower: true, // Chuyển đổi sang chữ thường
        remove: /[?\/\\#,+()$~%.'":*?<>{}]/g, // Loại bỏ các kí tự đặc biệt không mong muốn
    });
    return `${slug}-${randomString}`;
}

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function englishSUserNameFormatter(str) {
  return unidecode(str).replace(/\s/g, '').toLowerCase();
}

function checkCloudinary(str) {
  return str.includes('cloudinary');
}

module.exports = {
  resizeProfilePicture,
  // urlStringConvert,
  chuyenDoiChuoiThanhURL,
  getRandomHexColor,
  englishSUserNameFormatter,
  checkCloudinary
};

