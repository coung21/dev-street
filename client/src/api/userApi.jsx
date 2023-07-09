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

export const getNotification = (userId) => {
  return api.get(`/user/${userId}/notifications`)
}

export const getReadingList = (userId) => {
  return api.get(`/user/${userId}/readinglist`)
}

export const getUserProfile = (userId) => {
  return api.get(`/user/${userId}`);
}

export const editUserProfile = (userId, data) => {
  return api.post(`/user/${userId}/edit`, data)
}

export const followUser = (userId, followerId) => {
  return api.post('/user/follow', { userid: userId, followerid: followerId });
}

export const unFollowUser = (userId, followerId) => {
  return api.post('/user/unfollow', { userid: userId, followerid: followerId });
}

