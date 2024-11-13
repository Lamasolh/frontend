// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SEND_TO({ state }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/send-link-register', {
          email: state.item.email,
          name: state.item.name,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
}
