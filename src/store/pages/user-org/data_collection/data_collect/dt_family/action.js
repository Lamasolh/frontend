/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import store from '@/store'
import * as API from '@/services/API'

export default {
  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/dt_collect/saveFamily', {
          item: payload.item,
          listMember: payload.listMember,
          issId: payload.issId,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.famMem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.data.family.forEach(element => {
              state.items.push(element)
            })
            resp.data.data.family_record.forEach(element => {
              state.famMem.push(element)
            })
            store.commit('dtMEM/SET_ITEM', resp.data.data.member)
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
  },
  REFRESH({ state }) {
    state.saved = true
    state.show = false
  },
}
