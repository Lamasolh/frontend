// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getLinkFollow', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,

          },
        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            resp.data.res.forEach(element => {
              state.caseItem.push(element)
            })
            // commit('ADD_ALL_REF', { data: resp.data.referral })
          }
          if (localStorage.getItem('LinkAssment:referralOptions') != null) {
            state.referralOptions = JSON.parse(localStorage.getItem('LinkAssment:referralOptions'))
          }
          if (localStorage.getItem('LinkAssment:TypeOptions') != null) {
            state.typeOptions = JSON.parse(localStorage.getItem('LinkAssment:TypeOptions'))
          }
          if (localStorage.getItem('LinkAssment:CadOptions') != null) {
            state.cadOptions = JSON.parse(localStorage.getItem('LinkAssment:CadOptions'))
          }
          if (localStorage.getItem('LinkAssment:IssOptions') != null) {
            state.issOptions = JSON.parse(localStorage.getItem('LinkAssment:IssOptions'))
          }
          if (localStorage.getItem('LinkAssment:Referral') != null) {
            state.referral = JSON.parse(localStorage.getItem('LinkAssment:Referral'))
          }
          if (localStorage.getItem('LinkAssment:Gov') != null) {
            state.governorate = JSON.parse(localStorage.getItem('LinkAssment:Gov'))
          }
          if (localStorage.getItem('LinkAssment:Dis') != null) {
            state.district = JSON.parse(localStorage.getItem('LinkAssment:Dis'))
          }
          if (localStorage.getItem('LinkAssment:Type') != null) {
            state.type = JSON.parse(localStorage.getItem('LinkAssment:Type'))
          }
          if (localStorage.getItem('LinkAssment:Cadaster') != null) {
            state.cadaster = JSON.parse(localStorage.getItem('LinkAssment:Cadaster'))
          }
          if (localStorage.getItem('LinkAssment:ISS') != null) {
            state.iss = JSON.parse(localStorage.getItem('LinkAssment:ISS'))
          }
          if (localStorage.getItem('LinkAssment:RangeDate') != null) {
            state.rangedate = JSON.parse(localStorage.getItem('LinkAssment:RangeDate'))
          }
          if (localStorage.getItem('LinkAssment:PerPage') != null) {
            state.perPage = JSON.parse(localStorage.getItem('LinkAssment:PerPage'))
          }
          if (localStorage.getItem('LinkAssment:sortBy') != null) {
            state.sortBy = JSON.parse(localStorage.getItem('LinkAssment:sortBy'))
          }
          if (localStorage.getItem('LinkAssment:sortDesc') != null) {
            state.sortDesc = JSON.parse(localStorage.getItem('LinkAssment:sortDesc'))
          }
          if (localStorage.getItem('LinkAssment:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('LinkAssment:sortDirection'))
          }
          if (localStorage.getItem('LinkAssment:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('LinkAssment:sortDirection'))
          }
          if (localStorage.getItem('LinkAssment:filterOn') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('LinkAssment:filterOn'))
          }
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  RESET_STATE({ commit }) {
    commit('`RESET_STATE`')
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
      state.show = true
      state.caseItem = []
      state.governorate = null
      state.referral = null
      state.district = null
      state.cadaster = null
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      state.type = null
      state.iss = null
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
        type: payload.type,

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
