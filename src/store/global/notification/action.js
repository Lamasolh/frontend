// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  READ_ALL({ state, commit }) {
    console.log(state.notification)
    state.notification.forEach((element, index) => {
      commit('UPDATE_NOTIFICATION', index)
    })
    return new Promise((resolve, reject) => {
      API.apiClient.post('/api/read-all')
        .then(res => {
          console.log(res)
          resolve(true)
        })
        .catch(error => reject(error))
    })
  },
  CLEAR_ALL({ state }) {
    console.log(state.notification)
    state.notification = []
    return new Promise((resolve, reject) => {
      API.apiClient.post('/api/clear-all')
        .then(res => {
          console.log(res)
          resolve(true)
        })
        .catch(error => {
          console.log(error.response)
          reject(error)
        })
    })
  },
  READ({ state, commit }, payload) {
    console.log(state.notification)
    commit('UPDATE_NOTIFICATION_ID', payload)
    return new Promise((resolve, reject) => {
      API.apiClient.post('/api/read-notify', {
        id: payload,
      })
        .then(res => {
          console.log(res)
          resolve(true)
        })
        .catch(error => reject(error))
    })
  },
}
