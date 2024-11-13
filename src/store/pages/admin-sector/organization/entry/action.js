// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/menu/get_org_list_entry', {
          params: {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            proj_id: payload.proj_id,
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
  Save({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/manager/projectEntry', {
          prefix: payload.prefix,
          items: state.selectItem,
          proj_id: payload.proj_id,
        })
        .then(resp => {
          console.log('resp', resp)
          if (resp.data[0].result === 1) {
            state.selectItem = []
          }

          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },

}
