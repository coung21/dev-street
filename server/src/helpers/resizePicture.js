// Hàm để thay đổi kích thước của URL hình ảnh
function resizeProfilePicture(url, size) {
  if (url && url.includes('s96-c')) {
    url = url.replace('s96-c', `s${size}-c`);
  }
  return url;
}



module.exports = resizeProfilePicture
