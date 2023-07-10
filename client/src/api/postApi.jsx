import api from './api'

export const getAllPost = () => {
  return api.get('/post')
}

export const getPostDetail =  async (slug) => {
  return await api.get(`/post/${slug}`)
}

export const getPostsByTag = (tag) => {
  return api.get(`/post/tags/${tag}`)
}

export const editPost = (postid, data) => {
  return api.patch(`/post/edit/${postid}`, data)
}

export const deletePost = (userId, postId) => {
  return api.delete(`/post/delete?userid=${userId}&postid=${postId}`);
}

export const likePost = (userId, postId) => {
  return api.post('/post/like', {userid: userId, postid: postId})
}
export const unlikePost = (userId, postId) => {
  return api.post('/post/unlike', {userid: userId, postid: postId})
}
export const bookmark = (userId, postId) => {
  return api.post('/post/bookmark', {userid: userId, postid: postId})
}
export const unBookmark = (userId, postId) => {
  return api.post('/post/unbookmark', {userid: userId, postid: postId})
}

export const getComments = (id) => {
  return api.get(`/post/comment/${id}`)
}

export const postComment = (id, author, body, parent) => {
  return api.post(`/post/comment/${id}`, {author: author, body: body, parent: parent});
}