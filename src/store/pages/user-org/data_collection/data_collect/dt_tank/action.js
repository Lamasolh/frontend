// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SEND_DATA({ state }, payload) {
    state.show = true

    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/dt_collect/saveTank', {
          item: payload.item,
          lst: payload.lstWtr,
          issId: payload.issId,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.itemsTnkWtr = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.data.tanks.forEach(element => {
              state.items.push(element)
            })
            resp.data.data.tank_water_source.forEach(element => {
              state.itemsTnkWtr.push(element)
            })
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
