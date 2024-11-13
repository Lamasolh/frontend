/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA_VIEW({ state }, payload) {
    state.show = true
    state.note = null
    console.log('refresh', payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getMonitoringViewWtr', {
          params: {
            wtt_id: payload.wtt_id,
            issId: payload.issId,
            prefix: payload.prefix,
            type: payload.type,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data)
          state.caseItem = []
          state.tentItem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.res.forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.tent.forEach(element => {
              state.tentItem.push(element)
            })
          }
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
  APP_TER_PUB({ state }, payload) {
    state.show = true
    console.log(payload, state.note)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_monitoring_view_wtr', {
          cycleId: payload.cycleId,
          type: payload.type,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          note: state.note,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error.response)
        })
    }))
  },
  UNLOCK({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/monitoring_unlock_cycle', {
          cycleId: payload.cycleId,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error.response)
        })
    }))
  },
  EditCase({ state, dispatch }, payload) {
    console.log(payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/MoniToolsWtrEditCase', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          note: payload.note,
          qty: payload.qty,
          chlorine: payload.chlorine,
          wtt_id: payload.wtt_id,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_DATA_VIEW', {
            wtt_id: payload.issId,
          })
          // this.REFRESH({ state, dispatch }, payload)
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
}
