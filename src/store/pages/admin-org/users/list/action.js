// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-user-org-list')
        .then(resp => {
          if (Object.entries(resp.data).length !== 0) {
            state.userItem = []
            resp.data[0].forEach(element => {
              state.userItem.push(element)
            })
          }
          console.log(resp)
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      state.userItem = []
      state.job = null
      state.status = null
      state.perPage = 10
      state.totalRows = 0
      state.currentPage = 1
      // Sort
      state.sortBy = ''
      state.sortDesc = false
      state.sortDirection = 'asc'
      // Filter
      state.filter = null
      state.filterOn = []
      dispatch('GET_DATA', {
        prefix: payload.prefix,
        prefixRole: payload.prefixRole,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
