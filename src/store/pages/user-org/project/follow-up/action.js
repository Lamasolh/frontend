// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getFollowUp', {
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
            commit('ADD_ALL_REF', { data: resp.data.referral })
          }
          if (localStorage.getItem('followUP:referralOptions') != null) {
            state.referralOptions = JSON.parse(localStorage.getItem('followUP:referralOptions'))
          }
          if (localStorage.getItem('followUP:TypeOptions') != null) {
            state.typeOptions = JSON.parse(localStorage.getItem('followUP:TypeOptions'))
          }
          if (localStorage.getItem('followUP:CadOptions') != null) {
            state.cadOptions = JSON.parse(localStorage.getItem('followUP:CadOptions'))
          }
          if (localStorage.getItem('followUP:IssOptions') != null) {
            state.issOptions = JSON.parse(localStorage.getItem('followUP:IssOptions'))
          }
          if (localStorage.getItem('followUP:Referral') != null) {
            state.referral = JSON.parse(localStorage.getItem('followUP:Referral'))
          }
          if (localStorage.getItem('followUP:Gov') != null) {
            state.governorate = JSON.parse(localStorage.getItem('followUP:Gov'))
          }
          if (localStorage.getItem('followUP:Dis') != null) {
            state.district = JSON.parse(localStorage.getItem('followUP:Dis'))
          }
          if (localStorage.getItem('followUP:Type') != null) {
            state.type = JSON.parse(localStorage.getItem('followUP:Type'))
          }
          if (localStorage.getItem('followUP:Cadaster') != null) {
            state.cadaster = JSON.parse(localStorage.getItem('followUP:Cadaster'))
          }
          if (localStorage.getItem('followUP:ISS') != null) {
            state.iss = JSON.parse(localStorage.getItem('followUP:ISS'))
          }
          if (localStorage.getItem('followUP:RangeDate') != null) {
            state.rangedate = JSON.parse(localStorage.getItem('followUP:RangeDate'))
          }
          if (localStorage.getItem('followUP:PerPage') != null) {
            state.perPage = JSON.parse(localStorage.getItem('followUP:PerPage'))
          }
          if (localStorage.getItem('followUP:sortBy') != null) {
            state.sortBy = JSON.parse(localStorage.getItem('followUP:sortBy'))
          }
          if (localStorage.getItem('followUP:sortDesc') != null) {
            state.sortDesc = JSON.parse(localStorage.getItem('followUP:sortDesc'))
          }
          if (localStorage.getItem('followUP:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('followUP:sortDirection'))
          }
          if (localStorage.getItem('followUP:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('followUP:sortDirection'))
          }
          if (localStorage.getItem('followUP:filterOn') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('followUP:filterOn'))
          }
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  RESET_STATE({ commit }) {
    commit('RESET_STATE')
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
