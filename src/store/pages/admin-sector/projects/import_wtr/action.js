// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  Save_DATA_ISS({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/import_excel_iss_wtr', {
        prefix: payload.prefix,
        iss: state.iss,
      })
      .then(resp => {
        console.log('//////////////')
        console.log(resp)
        let numISS0 = 0
        let numISS = 0
        let numISSE = 0
        let numISSER = 0
        if (Object.entries(resp.data).length !== 0) {
          // state.error = []
          console.log('/inside/////')
          resp.data.resultISS.forEach(element => {
            console.log(element)
            console.log(element[0])
            console.log(element[1])
            console.log(element[0][0])
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numISS0 += 1
            } else if (element[0].result === 1) {
              numISS += 1
            } else if (element[0].result === 2) {
              numISSE += 1
            } else {
              numISSER += 1
              console.log('Err', element)
            }
          })
        }
        console.log('//////////////')
        console.log('iss result 0', numISS0)
        console.log('iss result 1', numISS)
        console.log('iss result 2', numISSE)
        console.log('iss result ?', numISSER)
        console.log('//////////////')
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error)
        state.show = false
        reject(error)
      }))
  },
}
