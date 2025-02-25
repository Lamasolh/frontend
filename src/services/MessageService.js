import * as API from '@/libs/axios'

export default {
  getMessages(page) {
    return API.apiClient.get(`/messages/?page=${page}`)
  },
  postMessage(payload) {
    return API.apiClient.post('/messages', payload)
  },
  paginateMessages(link) {
    return API.apiClient.get(link)
  },
}
