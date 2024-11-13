// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    return API.apiClient
      .get('/api/project/get-re-assign', {
        params: {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
        },
      })
      .then(resp => {
        console.log(resp)
        state.caseItem = []
        state.UsersOtions = []
        state.selectedOrgRef = []
        state.orgList = []
        if (Object.entries(resp.data).length !== 0) {
          resp.data[0].forEach(element => {
            state.caseItem.push(element)
          })
          resp.data.org.forEach(element => {
            state.orgList.push({
              value: element.org_id,
              title: element.org_name,
            })
          })
          // eslint-disable-next-line prefer-destructuring
          state.selectedOrgRef = state.orgList[0]
          console.log(state.selectedOrgRef)
        }
        return resp
      })
      .catch(error => {
        throw Error(error)
      })
  },
  SEND_TO_ORG({ state }, payload) {
    state.show = true
    console.log('payload', payload, state.selectedCase)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/save-re-assign', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.selectedCase,
          org: state.selectedOrgRef.value,
        })
        .then(resp => {
          console.log('result', resp)
          console.log(resp.data.res)
          console.log(resp.data.res[0])
          console.log(resp.data.res[1])
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
          }
          state.saved = false
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
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      state.caseItem = []
      state.userItem = []
      state.UsersOtions = []
      state.usersValue = null
      state.governorate = null
      state.referral = null
      state.district = null
      state.cadaster = null
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
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
      state.usersValue = null
      state.showModalRef = { active: false }
      state.selectedOrgRef = []
      state.orgList = []
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
}
