// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getIndicators', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log('r', resp.data.setting.value)
          state.showExport = resp.data.setting.value === 'true'
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.indicators = []
            resp.data.cases.forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.indicators.forEach(element => {
              state.indicators.push(element)
            })
          }
          if (localStorage.getItem('indicators:referralOptions') != null) {
            state.referralOptions = JSON.parse(localStorage.getItem('indicators:referralOptions'))
          }
          if (localStorage.getItem('indicators:TypeOptions') != null) {
            state.typeOptions = JSON.parse(localStorage.getItem('indicators:TypeOptions'))
          }
          if (localStorage.getItem('indicators:CadOptions') != null) {
            state.cadOptions = JSON.parse(localStorage.getItem('indicators:CadOptions'))
          }
          if (localStorage.getItem('indicators:IssOptions') != null) {
            state.issOptions = JSON.parse(localStorage.getItem('indicators:IssOptions'))
          }
          if (localStorage.getItem('indicators:Referral') != null) {
            state.referral = JSON.parse(localStorage.getItem('indicators:Referral'))
          }
          if (localStorage.getItem('indicators:Gov') != null) {
            state.governorate = JSON.parse(localStorage.getItem('indicators:Gov'))
          }
          if (localStorage.getItem('indicators:Dis') != null) {
            state.district = JSON.parse(localStorage.getItem('indicators:Dis'))
          }
          if (localStorage.getItem('indicators:Type') != null) {
            state.type = JSON.parse(localStorage.getItem('indicators:Type'))
          }
          if (localStorage.getItem('indicators:Cadaster') != null) {
            state.cadaster = JSON.parse(localStorage.getItem('indicators:Cadaster'))
          }
          if (localStorage.getItem('indicators:ISS') != null) {
            state.iss = JSON.parse(localStorage.getItem('indicators:ISS'))
          }
          if (localStorage.getItem('indicators:RangeDate') != null) {
            state.rangedate = JSON.parse(localStorage.getItem('indicators:RangeDate'))
          }
          if (localStorage.getItem('indicators:PerPage') != null) {
            state.perPage = JSON.parse(localStorage.getItem('indicators:PerPage'))
          }
          if (localStorage.getItem('indicators:sortBy') != null) {
            state.sortBy = JSON.parse(localStorage.getItem('indicators:sortBy'))
          }
          if (localStorage.getItem('indicators:sortDesc') != null) {
            state.sortDesc = JSON.parse(localStorage.getItem('indicators:sortDesc'))
          }
          if (localStorage.getItem('indicators:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('indicators:sortDirection'))
          }
          if (localStorage.getItem('indicators:sortDirection') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('indicators:sortDirection'))
          }
          if (localStorage.getItem('indicators:filterOn') != null) {
            state.sortDirection = JSON.parse(localStorage.getItem('indicators:filterOn'))
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
        .post('/api/project/saveIndicators', {
          item: payload.item,
          indicators: state.indicators,
          case_id: payload.item.case_id,
          org_id: payload.item.org_id,
          proj_id: payload.item.proj_id,
          referral_date: payload.item.referral_date,
          type: payload.type,
          extra: payload.extra,
          later: payload.later,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data[0])
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
