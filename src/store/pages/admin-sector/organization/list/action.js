// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/menu/get_org_list', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          console.log('resp', resp)
          if (Object.entries(resp.data).length !== 0) {
            state.orgList = []
            resp.data.res.forEach(element => {
              state.orgList.push(element)
            })
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
}
