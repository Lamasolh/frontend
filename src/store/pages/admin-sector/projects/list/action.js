// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state, commit }) {
    return API.apiClient
      .get('/api/manager/getProjectsList')
      .then(resp => {
        console.log(resp)
        if (Object.entries(resp.data).length !== 0) {
          state.caseProject = []
          resp.data.res.forEach(element => {
            state.caseProject.push(element)
          })
          commit('managePrj/ADD_ALL_ORGData', { data: resp.data.org }, { root: true })
        }
        return state
      })
      .catch(error => {
        console.log('Error')
        throw Error(error)
      })
  },
  REFRESH({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      state.caseProject = []
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
      dispatch('GET_DATA')
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },
}
