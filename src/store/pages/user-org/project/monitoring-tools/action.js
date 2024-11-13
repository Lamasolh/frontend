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
        type: payload.type,
        start: payload.startDate,
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
    console.log('d1', startDate)
    console.log('d2', endDate)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getMonitoring', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
            start: new Date(startDate).toDateString(),
            end: new Date(endDate).toDateString(),
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.case)
          state.caseItem = []
          state.orgList = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.case.forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.org.forEach(element => {
              state.orgList.push({
                value: element.org_id,
                title: element.org_name,
              })
            })
          }
          commit('ADD_IND_FILED', resp.data.ind)
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
          ph: payload.ph,
          type: payload.type,
          start: new Date(startDate).toDateString(),
          end: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.get.case.forEach(element => {
              state.caseItem.push(element)
            })
          }
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
    console.log('Oa')
    console.log(
      payload.prefix,
      payload.prefixRole,
      state.endItem,
      payload.ph,
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
  /// Get Options
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district:
                            state.district == null ? null : state.district.value,
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
  DELETE_CASE({ state }, payload) {
    state.show = true
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/MoniToolsEndCase', {
          items: state.deleteItem,
          ph: payload.ph,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
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
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  SEND_TO_ORG({ state }, payload) {
    console.log('res', payload)
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    console.log('d1', startDate)
    console.log('d2', endDate)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send_to_org_moni', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.showModalRef,
          org: state.selectedOrgRef.value,
          type: payload.type,
          start: new Date(startDate).toDateString(),
          end: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log('result', resp)
          state.caseItem = []
          state.orgList = []
          console.log('result', resp.data.get.case)
          console.log('result', resp.data.get.org)
          if (Object.entries(resp.data).length !== 0) {
            resp.data.get.case.forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get.org.forEach(element => {
              state.orgList.push({
                value: element.org_id,
                title: element.org_name,
              })
            })
          }
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          console.log('error', error)
          state.show = false
          reject(error)
        })
    })
  },
}
