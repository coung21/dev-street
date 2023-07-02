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