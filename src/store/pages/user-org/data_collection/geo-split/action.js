// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }) {
    state.show = true
    return API.apiClient
      .get('/api/dt_collect/getGeoSplit', {
        params: {
          issId: state.cadaster.value,
        },
      })
      .then(resp => {
        console.log(resp)
        state.items = []
        if (Object.entries(resp.data).length !== 0) {
          resp.data.data.forEach(element => {
            // eslint-disable-next-line no-param-reassign
            element.active = element.active === 1
            state.items.push(element)
          })
        }
        state.show = false
        return resp
      })
      .catch(error => {
        state.show = false
        throw Error(error)
      })
  },
  SEND_DATA({ state }) {
    state.show = true
    return API.apiClient
      .post('/api/dt_collect/saveGeoSplit', {
        items: state.items,
      })
      .then(resp => {
        state.show = false
        console.log(resp)
        return resp.data
      })
      .catch(error => {
        state.show = false
        throw Error(error)
      })
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null ? null : state.district.value,
            type: 4,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.result)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: state.type == null ? null : state.type.value,
            cad: state.cadaster == null ? null : state.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ISS', resp.data.result)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  REFRESH({ state }) {
    state.saved = true
    state.show = false
    // state.items = []
    state.referral = null
    state.district = null
    state.cadaster = null
    state.typeOptions = []
    state.cadOptions = []
    state.issOptions = []
    state.type = null
    state.iss = null
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
  },

}
