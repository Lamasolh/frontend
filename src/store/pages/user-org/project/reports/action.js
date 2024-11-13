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
        .post('/api/project/report_activity', {
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
  GET_REPORT_CASE({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      console.log('res', payload)
      const d = new Date(payload.endDate)
      const d1 = new Date(payload.startDate)
      const startDate = d1.setDate(d1.getDate() - 1)
      const endDate = d.setDate(d.getDate() + 1)
      console.log('d1', startDate)
      console.log('d2', endDate)
      API.apiClient
        .post('/api/project/report_case', {
          prjprefix: payload.prefix,
          type: payload.type,
          from: new Date(startDate).toDateString(),
          to: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          state.caseItem = resp.data.res
          state.saved = false
          state.show = false
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
  GET_REPORT_INV({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/report_inv', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data.lst)
          // Field
          state.invField = []
          state.invField.push({
            key: 'wh_name',
            label: 'Warehouse Name',
          })
          resp.data.lst.forEach(element => {
            state.invField.push({
              key: element.items_name,
              label: element.items_name,
            })
          })
          const obj = Object()
          state.invField.forEach(element => {
            const lbl = element.label
            obj[lbl] = element.key
          })
          const js = JSON.stringify(obj)
          state.invExportField = JSON.parse(js)
          // Item
          const un = resp.data.res.filter(
            (value, index, self) => index
                            === self.findIndex(t => t.wh_id === value.wh_id),
          )
          console.log('un', un)
          const listItem = []
          const vl = []
          resp.data.lst.forEach(e => {
            vl.push(e.items_name)
          })
          console.log('vl', vl)
          un.forEach(el => {
            // const ls = []
            vl.forEach(elm => {
              console.log('el', el, el.wh_id)
              console.log('elm', elm, elm)
              const vv = resp.data.res.filter(
                l => l.itm_name === elm && l.wh_id === el.wh_id,
              )
              el[elm] = vv[0].itm_total
              console.log('elmv', vv)
            })
            listItem.push(el)
          })
          state.invItem = listItem
          console.log('field', state.invField)
          console.log('item', state.invItem)
          state.show = false
          state.saved = false
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
  GET_REPORT_CAD({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/report_cad', {
          prefix: payload.prefix,
          year: state.year.value,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          // Item
          state.cadItem = resp.data.res
          state.show = false
          state.saved = false
          resolve(resp.data)
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
