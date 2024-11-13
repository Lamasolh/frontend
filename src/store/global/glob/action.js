// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_TYPE({ state, commit }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: payload.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ALL_TYPE', resp.data.result)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  GET_CAD({ state, commit }, payload) {
    state.show = true
    console.log(payload.district.value, payload.type.value)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: payload.district.value,
            type: payload.type.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ALL_MUN', resp.data.result)
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
}
