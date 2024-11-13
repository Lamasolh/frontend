// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel', {
        prefix: payload.prefix,
        residential: state.residential,
        iss: state.iss,
        csh: state.csh,
        pg: state.pg,
        pc: state.pc,
      })
      .then(resp => {
        console.log(resp)
        let numResidnetialL0 = 0
        let numResidnetialL = 0
        let numResidnetialS = 0
        let numResidnetialO = 0
        let numResidnetialLE = 0
        let numResidnetialSE = 0
        let numResidnetialOE = 0
        let numResidnetialLER = 0
        let numResidnetialSER = 0
        let numResidnetialOER = 0
        let numISS0 = 0
        let numISS = 0
        let numISSE = 0
        let numISSER = 0

        let numCSh0 = 0
        let numCSh = 0
        let numCShE = 0
        let numCShER = 0

        let numPG0 = 0
        let numPG = 0
        let numPGE = 0
        let numPGER = 0

        let numPC0 = 0
        let numPC = 0
        let numPCE = 0
        let numPCER = 0
        if (Object.entries(resp.data).length !== 0) {
          state.error = []
          resp.data.resultResidnetial.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'Resendtial',
                Name: element[1][0],
                Reason: `${element[0][0].stat}`,
              })
              numResidnetialL0 += 1
            } else if (element[0].result_L === 1) {
              numResidnetialL += 1
            } else if (element[0].result_L === 2) {
              numResidnetialLE += 1
            } else {
              numResidnetialLER += 1
              console.log('Err', numResidnetialLER)
            }
            if (element[0].result_S === 1) {
              numResidnetialS += 1
            } else if (element[0].result_S === 2) {
              numResidnetialSE += 1
            } else {
              numResidnetialSER += 1
              console.log('Err', numResidnetialSER)
            }
            if (element[0].result_O === 1) {
              numResidnetialO += 1
            } else if (element[0].result_O === 2) {
              numResidnetialOE += 1
            } else {
              numResidnetialOER += 1
              console.log('Err', numResidnetialOER)
            }
          })
          resp.data.resultISS.forEach(element => {
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
          resp.data.resultCSH.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numCSh0 += 1
            } else if (element[0].result === 1) {
              numCSh += 1
            } else if (element[0].result === 2) {
              numCShE += 1
            } else {
              numCShER += 1
              console.log('Err', element)
            }
          })
          resp.data.resultPG.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numPG0 += 1
            } else if (element[0].result === 1) {
              numPG += 1
            } else if (element[0].result === 2) {
              numPGE += 1
            } else {
              numPGER += 1
              console.log('Err', element)
            }
          })
          resp.data.resultPC.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numPC0 += 1
            } else if (element[0].result === 1) {
              numPC += 1
            } else if (element[0].result === 2) {
              numPCE += 1
            } else {
              numPCER += 1
              console.log('Err', element)
            }
          })
        }
        console.log('result 0', numResidnetialL0)
        console.log('RSL result 1', numResidnetialL)
        console.log('RSL result 2', numResidnetialLE)
        console.log('RSL result ?', numResidnetialLER)
        console.log('//////////////')
        console.log('RSS result 1', numResidnetialS)
        console.log('RSS result 2', numResidnetialSE)
        console.log('RSS result ?', numResidnetialSER)
        console.log('//////////////')
        console.log('RSO result 1', numResidnetialO)
        console.log('RSO result 2', numResidnetialOE)
        console.log('RSO result ?', numResidnetialOER)
        console.log('//////////////')
        console.log('iss result 0', numISS0)
        console.log('iss result 1', numISS)
        console.log('iss result 2', numISSE)
        console.log('iss result ?', numISSER)
        console.log('//////////////')
        console.log('CSh result 0', numCSh0)
        console.log('CSh result 1', numCSh)
        console.log('CSh result 2', numCShE)
        console.log('CSh result ?', numCShER)
        console.log('//////////////')
        console.log('PG result 0', numPG0)
        console.log('PG result 1', numPG)
        console.log('PG result 2', numPGE)
        console.log('PG result ?', numPGER)
        console.log('//////////////')
        console.log('PC result 0', numPC0)
        console.log('PC result 1', numPC)
        console.log('PC result 2', numPCE)
        console.log('PC result ?', numPCER)
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
  Save_DATA_RESD({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel_resd', {
        prefix: payload.prefix,
        residential: state.residential,
      })
      .then(resp => {
        console.log(resp)
        let numResidnetialL0 = 0
        let numResidnetialL = 0
        let numResidnetialS = 0
        let numResidnetialO = 0
        let numResidnetialLE = 0
        let numResidnetialSE = 0
        let numResidnetialOE = 0
        let numResidnetialLER = 0
        let numResidnetialSER = 0
        let numResidnetialOER = 0
        if (Object.entries(resp.data).length !== 0) {
          // state.error = []
          resp.data.resultResidnetial.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'Resendtial',
                Name: element[1][0],
                Reason: `${element[0][0].stat}`,
              })
              numResidnetialL0 += 1
              console.log('RSL', element)
            } else if (element[0].result_L === 1) {
              numResidnetialL += 1
            } else if (element[0].result_L === 2) {
              numResidnetialLE += 1
            } else if (element[0].result_L === 0) {
              numResidnetialLER += 1
              console.log('RSLER', element)
            }
            if (element[0].result_S === 1) {
              numResidnetialS += 1
            } else if (element[0].result_S === 2) {
              numResidnetialSE += 1
            } else if (element[0].result_S === 0) {
              numResidnetialSER += 1
            }
            if (element[0].result_O === 1) {
              numResidnetialO += 1
            } else if (element[0].result_O === 2) {
              numResidnetialOE += 1
            } else if (element[0].result_O === 0) {
              numResidnetialOER += 1
            }
          })
        }
        console.log('result 0', numResidnetialL0)
        console.log('RSL result 1', numResidnetialL)
        console.log('RSL result 2', numResidnetialLE)
        console.log('RSL result ?', numResidnetialLER)
        console.log('//////////////')
        console.log('RSS result 1', numResidnetialS)
        console.log('RSS result 2', numResidnetialSE)
        console.log('RSS result ?', numResidnetialSER)
        console.log('//////////////')
        console.log('RSO result 1', numResidnetialO)
        console.log('RSO result 2', numResidnetialOE)
        console.log('RSO result ?', numResidnetialOER)
        console.log('//////////////')
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
  Save_DATA_ISS({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel_iss', {
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
  Save_DATA_CSH({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel_csh', {
        prefix: payload.prefix,
        csh: state.csh,
      })
      .then(resp => {
        console.log(resp)
        let numCSh0 = 0
        let numCSh = 0
        let numCShE = 0
        let numCShER = 0
        if (Object.entries(resp.data).length !== 0) {
          // state.error = []
          resp.data.resultCSH.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numCSh0 += 1
            } else if (element[0].result === 1) {
              numCSh += 1
            } else if (element[0].result === 2) {
              numCShE += 1
            } else {
              numCShER += 1
              console.log('Err', element)
            }
          })
        }
        console.log('CSh result 0', numCSh0)
        console.log('CSh result 1', numCSh)
        console.log('CSh result 2', numCShE)
        console.log('CSh result ?', numCShER)
        console.log('//////////////')
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
  Save_DATA_PG({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel_pg', {
        prefix: payload.prefix,
        pg: state.pg,
      })
      .then(resp => {
        console.log(resp)

        let numPG0 = 0
        let numPG = 0
        let numPGE = 0
        let numPGER = 0
        if (Object.entries(resp.data).length !== 0) {
          // state.error = []
          resp.data.resultPG.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numPG0 += 1
            } else if (element[0].result === 1) {
              numPG += 1
            } else if (element[0].result === 2) {
              numPGE += 1
            } else {
              numPGER += 1
              console.log('Err', element)
            }
          })
        }
        console.log('//////////////')
        console.log('PG result 0', numPG0)
        console.log('PG result 1', numPG)
        console.log('PG result 2', numPGE)
        console.log('PG result ?', numPGER)
        console.log('//////////////')
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
  Save_DATA_PC({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .post('/api/manager/check_excel_pc', {
        prefix: payload.prefix,
        pc: state.pc,
      })
      .then(resp => {
        console.log(resp)
        let numPC0 = 0
        let numPC = 0
        let numPCE = 0
        let numPCER = 0
        if (Object.entries(resp.data).length !== 0) {
          // state.error = []
          resp.data.resultPC.forEach(element => {
            if (element[0].result === 0) {
              state.error.push({
                TYPE: 'ISS',
                Name: element[1][0],
                Reason: element[0][0].stat,
              })
              numPC0 += 1
            } else if (element[0].result === 1) {
              numPC += 1
            } else if (element[0].result === 2) {
              numPCE += 1
            } else {
              numPCER += 1
              console.log('Err', element)
            }
          })
        }
        console.log('//////////////')
        console.log('PC result 0', numPC0)
        console.log('PC result 1', numPC)
        console.log('PC result 2', numPCE)
        console.log('PC result ?', numPCER)
        console.log(state.error)
        state.show = false
        resolve()
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
}
