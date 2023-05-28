import api from './api'

export const signin = (payload) => {
  return api.post('/auth/signin', payload)
}
export const signup = (payload) => {
  return api.post('/auth/signup', payload)
}

