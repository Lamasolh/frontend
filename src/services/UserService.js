import * as API from '@/libs/axios'

export default {
  getUser(userId) {
    return API.apiClient.get(`/users/${userId}`)
  },
  getUsers(page) {
    return API.apiClient.get(`/users/?page=${page}`)
  },
  paginateUsers(link) {
    return API.apiClient.get(link)
  },
}
