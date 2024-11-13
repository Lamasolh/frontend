/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_CASE_FOLL({ state, commit, rootGetters }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getCaseFollowUp', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            items: payload.items,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.items = []
            state.itemsfamily = []
            state.itemsrec = []
            state.items = resp.data[0][0]
            state.itemsfamily = resp.data[1][0]
            state.itemsrec = resp.data[2][0]
            state.priority_period = resp.data.setting[0].priority_period
            state.priority_interval = resp.data.setting[0].priority_internal
            commit('ADD_IND_FILED', resp.data.ind)
            commit('ADD_ALL_REF', { data: resp.data.referral })
            commit('ADD_TYPE', resp.data.type)
            commit('ADD_CAD', resp.data.cad)
            commit('ADD_ISS', resp.data.iss)
            commit('SET_SELECT', {
              items: state.items, family: state.itemsfamily, rec: state.itemsrec, getters: rootGetters,
            })
          }
          console.log('sssdsds')
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  /* REFRESH_IMAGE({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/refreshImage', {
          params: {
            case_id: state.items.case_id,

          },
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data[0])
          if (Object.entries(resp.data).length !== 0) {
            state.itemsrec.pcr_photo = null
            state.itemsrec.pcr_photo = resp.data[0].pcr_photo
          }
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  }, */
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_TYPE', resp.data.result)
          console.log('state.typeOptions')
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
            district: state.district.value,
            type: state.type.value,
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
            type: state.type.value,
            cad: state.cadaster.value,
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
  FOLLOWSAVE({ state }, payload) {
    state.show = true
    console.log('FOllowUp Save')
    console.log(state.type, state.iss)
    // phone
    const cnt = state.country.id === 1 ? '961' : '963'
    state.items.case_phone = cnt + state.country.number
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/followUpSave', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.items,
          itemsfam: state.itemsfamily,
          itemsrec: state.itemsrec,
          link: payload.link,
          projtype: payload.type,
          extra: state.filedOptions,

          type: state.type == null ? null : state.type.value,
          iss: state.iss == null ? null : state.iss.value,
        }).then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.saved = false
          }
          state.show = false
          resolve(resp.data[0])
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  FOLLOWCHECK({ state }, payload) {
    state.show = true
    console.log('FOllowUp Save')
    console.log(state.type, state.iss)
    // phone
    const cnt = state.country.id === 1 ? '961' : '963'
    state.items.case_phone = cnt + state.country.number
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/followUpCHECK', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.items,
          itemsfam: state.itemsfamily,
          itemsrec: state.itemsrec,
          link: payload.link,
          projtype: payload.type,
          extra: state.filedOptions,
          type: state.type == null ? null : state.type.value,
          iss: state.iss == null ? null : state.iss.value,
        }).then(resp => {
          console.log(resp)
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            state.saved = false
            state.caseItem = resp.data.check
          }
          state.show = false
          resolve(resp.data[0])
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },

  GET_LAT_LNG({ state }) {
    console.log(state.iss)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/follow_getIsslatlng', {
          params: {
            iss: state.iss.value,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },

  CHECK_DUPL({ state }, payload) {
    const cnt = state.country.id === 1 ? '961' : '963'
    state.items.case_phone = cnt + state.country.number
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/follow_check_phone', {
          params: {
            prefix: payload.prefix,
            phone: state.items.case_phone,
            caseId: payload.caseId,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log(resp.data[0][0].dup)
          resolve(resp.data[0][0].dup)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  GetOrglist({ state, rootState }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/GetOrglistProjctByCad', {
          params: {
            prefix: payload.prefix,
            cad_id: state.cadaster == null ? null : state.cadaster.value,
            type: state.type == null ? null : state.type.value,
            iss: state.iss == null ? null : state.iss.value,
            projtype: payload.type,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          let res
          const orgName = resp.data[0][0].org_name
          console.log(orgName)
          console.log(resp.data[0])
          console.log(resp.data)
          if (resp.data[0][0].org_id != null && resp.data[0][0].org_name != null) {
            if (resp.data[0][0].org_id === rootState.auth.userData.orgId) {
              res = 1
            } else {
              switch (resp.data[0][0].nearest) {
                case 1:
                  res = 3
                  break
                case 0:
                  res = 2
                  break
                default:
                  res = 0
              }
            }
          } else {
            res = 4
          }
          resolve({ result: res, orgName, orgid: resp.data[0][0].org_id })
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
}
