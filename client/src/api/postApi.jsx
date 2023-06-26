import api from './api'

export const getAllPost = () => {
  return api.get('/post')
}

export const getPostDetail =  async (slug) => {
  return await api.get(`/post/${slug}`)
}