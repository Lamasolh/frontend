/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  /// Get Data
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      // Options
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      ///
      state.referral = null
      state.district = null
      state.governorate = null
      state.type = null
      state.iss = null
      state.cadaster = null
      state.rangedate = null
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
        start: payload.startDate,
        type: payload.type,
        end: payload.endDate,
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
  GET_DATA({ state, commit }, payload) {
    console.log('res', payload)
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getMonitoring', {
          params: {
            prefix: payload.prefix,
            type: payload.type,
            prefixRole: payload.prefixRole,
            start: new Date(startDate).toDateString(),
            end: new Date(endDate).toDateString(),
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.case)
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.case.forEach(element => {
              state.caseItem.push(element)
            })
          }
          commit('ADD_IND_FILED', resp.data.ind)
          console.log(state.caseItem)
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
  EndCase({ state }, payload) {
    state.show = true
    console.log('Oa')
    console.log(
      payload.prefix,
      payload.prefixRole,
      state.endItem,
      payload.ph,
      payload.type,
    )
    console.log('res', payload)
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    console.log('d1', startDate)
    console.log('d2', endDate)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/MoniEndCase', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.endItem,
          type: payload.type,
          ph: payload.ph,
          start: new Date(startDate).toDateString(),
          end: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.get.case.forEach(element => {
              state.caseItem.push(element)
            })
          }
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  ReviveCase({ state }, payload) {
    state.show = true
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/MoniReviveCase', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: payload.items,
          ph: payload.ph,
          type: payload.type,
          start: new Date(startDate).toDateString(),
          end: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data.get)
          console.log(Object.entries(resp.data.get))
          console.log(Object.entries(resp.data.get).length)
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            if (Object.entries(resp.data.get).length !== 0) {
              resp.data.get.case.forEach(element => {
                state.caseItem.push(element)
              })
            }
          }
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  /// Get Options
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
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
    })
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district:
                            state.district == null
                              ? null
                              : state.district.value,
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
    })
  },
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: state.type == null ? null : state.type.value,
            cad:
                            state.cadaster == null ? null : state.cadaster.value,
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
    })
  },
  /// M&E
  GET_DATA_ME({ state }, payload) {
    console.log('res', payload)
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate())
    const endDate = d.setDate(d.getDate())
    console.log('d1', startDate)
    console.log('d2', endDate)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/SearchMonitoringME', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
            start_date: new Date(startDate).toDateString(),
            end_date: new Date(endDate).toDateString(),
            percentage: state.percentage,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.case)
          state.caseItemME = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.case.forEach(element => {
              console.log('elm', element)
              if (
                element.monitored === 1
                             && element.monitored_inprogress === 1
              ) {
                element._rowVariant = 'info'
              }
              if (
                element.monitored === 1
                    && element.monitored_inprogress === 0
              ) {
                element._rowVariant = 'success'
              }
              state.caseItemME.push(element)
            })
          }
          console.log(state.caseItemME)
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
  GET_M_E({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getMonitoringME', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log(resp)
          state.caseItemME = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.case.forEach(element => {
              console.log('elm', element)
              if (
                element.monitored === 1
                  && element.monitored_inprogress === 1
              ) {
                element._rowVariant = 'info'
              }
              if (
                element.monitored === 1
                     && element.monitored_inprogress === 0
              ) {
                element._rowVariant = 'success'
              }
              state.caseItemME.push(element)
            })
          }
          console.log(state.caseItemME)
          state.show = false
          resolve(state.caseItemME)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },
  MECLEAR({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/ClearMonitoringME', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.caseItemME = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.case.forEach(element => {
              console.log('elm', element)
              if (
                element.monitored === 1
                 && element.monitored_inprogress === 1
              ) {
                element._rowVariant = 'info'
              }
              if (
                element.monitored === 1
                     && element.monitored_inprogress === 0
              ) {
                element._rowVariant = 'success'
              }
              state.caseItemME.push(element)
            })
          }
          console.log(state.caseItemME)
          state.show = false
          resolve(resp.data.case)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },
}
