// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    console.log(payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/feedback/getinfo', {
          params: {
            prefix: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp)
          let res = 0
          let stat = 'الرابط غير صحيح'
          if (Object.entries(resp.data).length !== 0) {
            if (resp.data.res === 0) {
              res = 0
            } else {
              res = resp.data.res[0].result
              if (res === 2) {
                stat = resp.data.res[0].stat
              }
              state.casid = resp.data.res[0].casid
              state.fullname = resp.data.res[0].cas_nam
              state.case_code = resp.data.res[0].casecode
              console.log(state.case_code)
              state.org = resp.data.res[0].casorg
            }
          }
          state.show = false
          resolve([res, stat])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  Save_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/feedback/submit', {
          prefix: payload.prefix,
          codeprefix: payload.code,
          fullname: state.fullname,
          code: state.case_code,
          casid: state.casid,
          org: state.org,
          receiveItem: state.receiveItem,
          reciveInclude: state.reciveInclude,
          receiveItemDate: state.receiveItemDate,
          receiveItemAccept: state.receiveItemAccept,
          notAccept: state.notAccept,
          receiveItemAcceptFam: state.receiveItemAcceptFam,
          notAcceptFam: state.notAcceptFam,
          ReciveAwerness: state.ReciveAwerness,
          ReciveAwernessuseful: state.ReciveAwernessuseful,
          ReciveAwernessAccept: state.ReciveAwernessAccept,
          OtherInfo: state.OtherInfo,
          OtherItem: state.OtherItem,
          TakeToOther: state.TakeToOther,
          OtherComment: state.OtherComment,
          TeamReat: state.TeamReat,
          value: state.value,
        })
        .then(resp => {
          console.log(resp)
          let res = 0
          if (resp.data.res[0] != null) {
            res = resp.data.res[0].result
          }
          state.show = false
          resolve(res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
}
