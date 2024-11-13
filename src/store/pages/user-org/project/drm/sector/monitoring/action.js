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
    console.log('res', payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/drm/getMonitoring', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.data)
          state.caseItem = []
          resp.data.data.forEach(element => {
            if (element.Status === 'Pending') {
              // eslint-disable-next-line no-underscore-dangle, no-param-reassign
              element._rowVariant = 'warning'
            } else if (element.Status === 'Done') {
              // eslint-disable-next-line no-underscore-dangle, no-param-reassign
              element._rowVariant = 'success'
            }
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
