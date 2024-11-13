// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getAwareness', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            resp.data.forEach(element => {
              state.caseItem.push(element)
            })
          }
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  RESET_STATE({ commit }) {
    commit('RESET_STATE')
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      state.caseItem = []
      state.referral = null
      state.district = null
      state.municipality = null
      state.rangedate = null
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
