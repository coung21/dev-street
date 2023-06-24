import api from './api'

export const getAllPost = () => {
  return api.get('/post')
}