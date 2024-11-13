// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  /// Get Data
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      //
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
        type: payload.type,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_DATA({ state }, payload) {
    console.log('res', 'sdd')

    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/org/getMonitoring', {
          params: {
            prefix: payload.prefix,
            type: payload.type,
            prefixRole: payload.prefixRole,
            /* start: new Date(startDate).toDateString(),
            end: new Date(endDate).toDateString(), */
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log('res', resp.data.data)
          state.caseItem = []
          resp.data.data.forEach(element => {
            state.caseItem.push(element)
          })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },

}
