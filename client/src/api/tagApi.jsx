import api from './api';

export const followTag = (tagId, userId) => {
  return api.post('/tag/follow', {tagId: tagId, userId: userId})
}
export const unFollowTag = (tagId, userId) => {
  return api.post('/tag/unfollow', {tagId: tagId, userId: userId})
}

export const getFollowTags = (id) => {
  return api.get(`/tag/${id}`)
}