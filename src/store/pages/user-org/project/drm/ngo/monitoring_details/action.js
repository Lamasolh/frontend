/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA_VIEW({ state }, payload) {
    state.show = true
    state.note = null
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/org/getMonitoringDetails', {
          params: {
            cycleId: payload.cycleId,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data)
          state.caseItem = []
          resp.data.data.forEach(element => {
            state.caseItem.push(element)
          })
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
