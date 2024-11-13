/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/manager/get-proj-setting', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.comOption = []
          state.staffOption = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.comList.forEach(element => {
              state.comOption.push({
                id: element.id,
                title: element.title,
              })
            })
            resp.data.stfList.forEach(element => {
              state.staffOption.push({
                id: element.id,
                title: element.title,
              })
            })
            const comList = []
            const stfList = []
            resp.data.st.forEach(element => {
              stfList.push({
                id: element.id,
                title: element.title,
              })
            })
            resp.data.com.forEach(element => {
              comList.push({
                id: element.id,
                title: element.title,
              })
            })
            resp.data.res.forEach(element => {
              state.items.push({
                cadId: element.cad_id,
                cad: element.cadastre_name,
                comMob: element.com_mobilizer == null ? null : resp.data.com.filter(({ id }) => JSON.parse(element.com_mobilizer).map(item => item.id).includes(id)),
                stafMon: element.stuff_montr == null ? null : resp.data.st.filter(({ id }) => JSON.parse(element.stuff_montr).map(item => item.id).includes(id)),
                /* iss_name: element.is_name,
                iss_id: element.iss_id,
                p_code: element.p_code, */
                quantity: element.def_qnty,
                // note: element.notes,
              })
            })
            console.log(state.items)
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
  SAVE_DATA({ state }, payload) {
    state.show = true

    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_setting', {
          prefix: payload.prefix,
          data: state.items,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          resp.data.res.forEach((element, index) => {
            if (element[0].result === 0) {
              state.items[index].status = 'Contact Administrator'
              state.items[index].result = 'danger'
            } else {
              state.items[index].items = element

              state.items[index].status = 'Success Operation'
              state.items[index].result = 'success'
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < element.length; i++) {
                if (element[i].status_id === 0) {
                  state.items[index].status = 'Failed Operation'
                  state.items[index].result = 'danger'
                  break
                } else if (element[i].status_id === 2) {
                  state.items[index].status = 'Warning Operation'
                  state.items[index].result = 'warning'
                  break
                }
              }
            }
          })
          console.log(state.items)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
}
