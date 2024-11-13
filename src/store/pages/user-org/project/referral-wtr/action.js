// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SAVE_DATA({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/', {
          prefix: payload.prefix,
          projtype: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          state.show = false
          reject(error.response)
        })
    }))
  },
}
