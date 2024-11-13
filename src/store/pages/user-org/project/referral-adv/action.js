/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SAVE_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/referral-adv', {
          prefix: payload.prefix,
          type: payload.type,
          items: state.items.filter(it => it.enable === true),
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.show = false
          state.items
            .filter(it => it.enable === true)
            .forEach((el, index) => {
              const dt = resp.data.result
              if (el.id === dt[index][1].id) {
                if (dt[index][0].result === 1) {
                  state.items.filter(
                    it => it.id === dt[index][1].id,
                  )[0]._rowVariant = 'success'
                  console.log(
                    state.items.filter(
                      it => it.id === dt[index][1].id,
                    ),
                  )
                  state.items.filter(
                    it => it.id === dt[index][1].id,
                  )[0].code = dt[index][0].ccd
                  state.items[index].enable = false
                } else {
                  state.items.filter(
                    it => it.id === dt[index][1].id,
                  )[0]._rowVariant = 'danger'
                  console.log(
                    state.items.filter(
                      it => it.id === dt[index][1].id,
                    ),
                  )
                  state.items[index].enable = true
                }
              }
            })
          resolve(resp.data.result)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error.response)
        })
    })
  },
  SAVE_DATA_RDMS({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/referral_adv_blnk', {
          prefix: payload.prefix,
          type: payload.type,
          items: state.items_blc,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          resp.data.result.forEach(el => {
            const m = state.items_blc.findIndex(
              e => e.id === el[1].id,
            )
            if (el[0].result === 0 || el[0].result === 2) {
              state.items_blc[m]._rowVariant = 'danger'
              state.items_blc[m].error = el[0].stat
              state.items_blc[m].enable = false
              console.log(el[0].stat)
            } else {
              state.items_blc.splice(m, 1)
            }
          })
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error.response)
        })
    })
  },
  ADD_ITEMS({ commit, rootState }, payload) {
    commit('ADD_ITEMS', { id: payload.id, rootState })
  },
  REFRESH({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/get_referral', {
          params: {
            type: payload.type,
            prefix: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp)
          state.priority_period = resp.data.setting[0].priority_period
          state.priority_interval = resp.data.setting[0].priority_internal
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
  /// //
  GET_TYPE_ITEM({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district:
                            payload.district == null
                              ? null
                              : payload.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          payload.typeOptions = []
          resp.data.result.forEach(el => {
            payload.typeOptions.push({
              title: el.name,
              title_ar: el.name_ar,
              value: el.st_id,
            })
          })
          console.log(payload.typeOptions)
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
  GET_CAD_ITEM({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district:
                            payload.district == null
                              ? null
                              : payload.district.value,
            type: payload.type == null ? null : payload.type.value,
          },
        })
        .then(resp => {
          payload.cadOptions = []
          resp.data.result.forEach(el => {
            payload.cadOptions.push({
              title: el.cadastre_name,
              title_ar: el.cadastre_name_ar,
              value: el.cadastre_id,
            })
          })
          console.log(payload)
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
  GET_ISS_ITEM({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: payload.type == null ? null : payload.type.value,
            cad:
                            payload.cadaster == null
                              ? null
                              : payload.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          payload.issOptions = []
          resp.data.result.forEach(el => {
            payload.issOptions.push({
              title: el.is_name,
              title_ar: el.is_name_ar,
              value: el.is_id,
              parms: el.cad_id,
            })
          })
          console.log(payload)
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
  ADD_ITEMS_IMPORT({ state, commit, rootState }, payload) {
    console.log(payload.items)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/check_import_adv', {
          items: payload.items,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          resp.data.result.forEach(el => {
            commit('ADD_ITEMS_IMPORT', { item: el, rootState })
          })
          //
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
}
