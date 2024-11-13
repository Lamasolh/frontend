// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SAVE_DATA({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/referral', {
          prefix: payload.prefix,
          projtype: payload.type,
          referral: state.referral == null ? null : state.referral.value,
          cadastral: state.cadaster == null ? null : state.cadaster.value,
          priority: state.priority.length === 1 ? state.priority[0].value : state.priority.value,
          items: state.items,
          type: state.type == null ? null : state.type.value,
          iss: state.iss == null ? null : state.iss.value,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          state.show = false
          reject(error.response)
        })
    }))
  },
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: state.district == null ? null : state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_TYPE', resp.data.result)
          console.log(state.typeOptions)
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
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null ? null : state.district.value,
            type: state.type == null ? null : state.type.value,
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
}
