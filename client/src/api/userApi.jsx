import api from './api'

export const signin = (payload) => {
  return api.post('/auth/signin', payload)
}
export const signup = (payload) => {
  return api.post('/auth/signup', payload)
}
export const signout = () => {
  return api.post('/auth/logout')
}
export const google = () => {
  return api.get('/auth/0auth/success');
}

