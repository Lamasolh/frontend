// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }) {
    state.show = true
    return API.apiClient
      .get('/api/dt_collect/getListDataCollectionData', {
        params: {
          cadId: state.cadaster,
        },
      })
      .then(resp => {
        console.log(resp)
        state.items = []
        if (Object.entries(resp.data.data).length !== 0) {
          resp.data.data.forEach(element => {
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
  GET_GOV({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/dt_collect/getGov')
        .then(resp => {
          console.log(resp)
          commit('ADD_GOV', resp.data.data)
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
  GET_DIS({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/dt_collect/getDis', {
          params: {
            gov: state.governorate.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_DIS', resp.data.data)
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
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/dt_collect/getCad', {
          params: {
            district: state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.data)
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
  ToRDMS({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/dt_collect/toRDMS', {
          params: {
            issId: payload.items.iss_id,
            cadId: state.cadaster,
          },
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          if (Object.entries(resp.data.data.data).length !== 0) {
            resp.data.data.data.forEach(element => {
              state.items.push(element)
            })
          }
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
  REFRESH({ state, dispatch }) {
    state.saved = true
    state.show = true
    // state.items = []
    /* state.referral = null
    state.district = null
    state.governorate = null
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
    state.items = [] */
    dispatch('GET_GOV', {})
  },
}
