/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_GRN({ state }, payload) {
    const dt = new Date(state.range)
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()
    let cadList
    console.log(state.cadaster)
    if (state.cadaster === null) {
      cadList = state.cadOptions.map(item => item.value).join(',')
    } else {
      cadList = state.cadaster.map(item => item.value).join(',')
    }
    console.log(cadList)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/grn', {
          prefix: payload.proj_id,
          month,
          year,
          cadList,
          supplier: state.supplier.value,
          pd: state.pd.value,
        })
        .then(resp => {
          console.log(resp)
          state.itemGRN = []
          console.log(resp.data.list)
          resp.data.list.forEach(el => {
            state.itemGRN.push(el)
          })
          console.log(state.itemGRN)
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log('error')
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  GET_GRN_DATA({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/grn_data', {
          prefix: payload.prefix,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_GOV', resp.data.listGov)
          commit('ADD_SUP', resp.data.listSup)
          commit('ADD_PD', resp.data.listPd)
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          console.log('error')
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  GET_DIS({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_dis_prj', {
          prefix: payload.prefix,
          type: payload.type,
          gov: state.governorate == null
            ? null
            : state.governorate.value,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_DIS', resp.data.res)
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
  GET_CAD({ state, commit }, payload) {
    state.show = true
    console.log('sss')
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_cad_prj', {
          prefix: payload.prefix,
          district: state.district == null
            ? null
            : state.district.value,
          type: 4,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.res)
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

}
