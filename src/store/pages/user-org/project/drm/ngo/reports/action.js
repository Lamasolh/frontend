/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_REPORT_ACTIVITY({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      const d = new Date(payload.endDate)
      const d1 = new Date(payload.startDate)
      const startDate = d1.setDate(d1.getDate() - 1)
      const endDate = d.setDate(d.getDate() + 1)
      console.log('d1', startDate)
      console.log('d2', endDate)
      API.apiClient
        .post('/api/project/report_activity_wtr', {
          prjprefix: payload.prefix,
          type: payload.type,
          from: new Date(startDate).toDateString(),
          to: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          state.activityItem = resp.data.res
          state.saved = false
          state.show = false
          resp.data.ind.filter(el => el.isInd === 'true' && el.active === 1).forEach(el => {
            state.indOp.push({
              id: el.id,
              inPages: JSON.parse(el.in_pages.toString().replace(/\\/g, '')),
              name: el.name,
              require: el.ind_require,
              desc: el.ind_desc,
              type: el.type,

            })
            state.activityField.push({
              key: el.name,
              label: el.name,
              class: 'mediumWidth',
            })
            state.activityExportField[el.name] = el.name
          })
          state.activityItem.forEach(el => {
            if (el.extra_fields != null) {
              JSON.parse(el.extra_fields).forEach(ex => {
                state.indOp.filter(e => e.id === ex[0])
                if (state.indOp.filter(e => e.id === ex[0])[0].type === 4) {
                  try {
                    // eslint-disable-next-line prefer-destructuring
                    el[state.indOp.filter(e => e.id === ex[0])[0].name] = JSON.parse(ex[1]).title
                  } catch (error) {
                    // eslint-disable-next-line prefer-destructuring
                    el[state.indOp.filter(e => e.id === ex[0])[0].name] = ex[1]
                  }
                } else {
                  // eslint-disable-next-line prefer-destructuring
                  el[state.indOp.filter(e => e.id === ex[0])[0].name] = ex[1]
                }
              })
            }
          })

          resolve(resp.data.result)
        })
        .catch(error => {
          console.log('error')
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
}
