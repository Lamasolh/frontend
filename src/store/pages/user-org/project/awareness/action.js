// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getAwareness', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log('res', resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            resp.data.forEach(element => {
              state.caseItem.push(element)
            })
          }
          if (localStorage.getItem('Awareness:referralOptions') != null) {
            state.referralOptions = JSON.parse(localStorage.getItem('Awareness:referralOptions'))
          }
          if (localStorage.getItem('Awareness:TypeOptions') != null) {
            state.typeOptions = JSON.parse(localStorage.getItem('Awareness:TypeOptions'))
          }
          if (localStorage.getItem('Awareness:CadOptions') != null) {
            state.cadOptions = JSON.parse(localStorage.getItem('Awareness:CadOptions'))
          }
          if (localStorage.getItem('Awareness:IssOptions') != null) {
            state.issOptions = JSON.parse(localStorage.getItem('Awareness:IssOptions'))
          }
          if (localStorage.getItem('Awareness:Referral') != null) {
            state.referral = JSON.parse(localStorage.getItem('Awareness:Referral'))
          }
          if (localStorage.getItem('Awareness:Gov') != null) {
            state.governorate = JSON.parse(localStorage.getItem('Awareness:Gov'))
          }
          if (localStorage.getItem('Awareness:Dis') != null) {
            state.district = JSON.parse(localStorage.getItem('Awareness:Dis'))
          }
          if (localStorage.getItem('Awareness:Type') != null) {
            state.type = JSON.parse(localStorage.getItem('Awareness:Type'))
          }
          if (localStorage.getItem('Awareness:Cadaster') != null) {
            state.cadaster = JSON.parse(localStorage.getItem('Awareness:Cadaster'))
          }
          if (localStorage.getItem('Awareness:ISS') != null) {
            state.iss = JSON.parse(localStorage.getItem('Awareness:ISS'))
          }
          if (localStorage.getItem('Awareness:RangeDate') != null) {
            state.rangedate = JSON.parse(localStorage.getItem('Awareness:RangeDate'))
          }
          if (localStorage.getItem('Awareness:PerPage') != null) {
            state.perPage = JSON.parse(localStorage.getItem('Awareness:PerPage'))
          }
          if (localStorage.getItem('Awareness:sortBy') != null) {
            state.sortBy = JSON.parse(localStorage.getItem('Awareness:sortBy'))
          }
          if (localStorage.getItem('Awareness:sortDesc') != null) {
            state.sortDesc = JSON.parse(localStorage.getItem('Awareness:sortDesc'))
          }
          if (localStorage.getItem('Awareness:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('Awareness:sortDirection'))
          }
          if (localStorage.getItem('Awareness:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('Awareness:sortDirection'))
          }
          if (localStorage.getItem('Awareness:filterOn') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('Awareness:filterOn'))
          }
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  SAVE_DATA({ state }, payload) {
    console.log(payload)
    console.log(state.comments)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/saveAwareness', {
          item: payload.item,
          case_id: payload.item.case_id,
          org_id: payload.item.org_id,
          proj_id: payload.item.proj_id,
          referral_date: payload.item.referral_date,
          later: payload.later,
          comments: state.comments,
          type: payload.type,
          malecount: state.malecount == null ? null : state.malecount,
          femalecount: state.femalecount == null ? null : state.femalecount,
          household: state.household == null ? null : state.household,
          feedback: state.feedback == null ? null : state.feedback.value,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.res[0])
        })
        .catch(error => {
          console.log(error)
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
