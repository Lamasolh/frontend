// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    return API.apiClient
      .get('/api/project/getGeoSplit', {
        params: {
          prefix: payload.prefix,
          prefixRole: 'DTCLS',
          type: payload.type,
        },
      })
      .then(resp => {
        console.log(resp)
        state.items = []
        if (Object.entries(resp.data).length !== 0) {
          resp.data[0].forEach(element => {
            state.items.push(element)
          })
        }
        return resp
      })
      .catch(error => {
        throw Error(error)
      })
  },
  SEND_DATA({ state }, payload) {
    state.show = true
    console.log('ss')
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/dt_collect/saveWaterSource', {
          item: payload.item,
          issId: payload.issId,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.data.water_source.forEach(element => {
              state.items.push(element)
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
