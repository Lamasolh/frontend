// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  UploadExcel(_, payload) {
    return new Promise((resolve, reject) => {
      console.log('sd')
      API.apiClient
        .post('/api/putExcel', {
          excel: payload.json,
        })
        .then(resp => {
          console.log('res', resp)
          resolve(resp.data)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  },
  ImportCLR(_, payload) {
    return new Promise((resolve, reject) => {
      console.log('sd')
      API.apiClient
        .post('/api/putExcelCLR', {
          excel: payload.json,
        })
        .then(resp => {
          console.log('res', resp)
          resolve(resp.data)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  },
}
