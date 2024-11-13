/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import store from '@/store'
import * as API from '@/services/API'

export default {
  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/dt_collect/saveTENT', {
          item: payload.item,
          issId: payload.issId,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.itemsTank = []
          state.itemsFam = []
          state.itemsLat = []
          state.itemsPit = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.data.tents.forEach(element => {
              state.items.push(element)
            })
            resp.data.data.tank.forEach(element => {
              state.itemsTank.push(element)
            })
            resp.data.data.fam.forEach(element => {
              state.itemsFam.push(element)
            })
            resp.data.data.lat.forEach(element => {
              state.itemsLat.push(element)
            })
            resp.data.data.pit.forEach(element => {
              state.itemsPit.push(element)
            })
            store.commit('dtMEM/SET_ITEM', resp.data.data.ben)
            store.commit('dtFAM/SET_ITEM', resp.data.data.family)
            store.commit('dtFAM/SET_ITEM_REC', resp.data.data.famRec)
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
