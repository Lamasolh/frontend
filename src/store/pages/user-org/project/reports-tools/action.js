/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_REPORT_SECTOR({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
    /*  const d = new Date(payload.endDate)
      const d1 = new Date(payload.startDate)
      const startDate = d1.setDate(d1.getDate() - 1)
      const endDate = d.setDate(d.getDate() + 1)
      console.log('d1', startDate)
      console.log('d2', endDate) */
      API.apiClient
        .post('/api/project/report_sector_tools', {
          prjprefix: payload.prefix,
          type: payload.type,
          /* from: new Date(startDate).toDateString(),
          to: new Date(endDate).toDateString(), */
        })
        .then(resp => {
          console.log(resp)
          state.sectorItem = resp.data.res
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
  GET_REPORT_ACTIVITY({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      const d = new Date(payload.endDate)
      const d1 = new Date(payload.startDate)
      const startDate = d1.setDate(d1.getDate() - 1)
      const endDate = d.setDate(d.getDate() + 1)
      // console.log('d1', startDate)
      // console.log('d2', endDate)
      API.apiClient
        .post('/api/project/report_activity_tools', {
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
              active: el.active,
            })
            state.activityField.push({
              key: el.name,
              label: el.name,
              class: 'mediumWidth',
            })
            state.activityExportField[el.name] = el.name
          })
          let num = 0
          let num1 = 0
          let num2 = 0
          let num3 = 0
          let num4 = 0
          let numError = 0
          state.activityItem.forEach(el => {
            if (el.extra_fields != null) {
              JSON.parse(el.extra_fields).forEach(ex => {
                num += 1
                console.log('num', el.case_id, el.extra_fields)
                if (state.indOp.filter(e => e.id === ex[0]).length !== 0) {
                  if (state.indOp.filter(e => e.id === ex[0])[0].type === 4) {
                    num4 += 4
                    try {
                      // eslint-disable-next-line prefer-destructuring
                      el[state.indOp.filter(e => e.id === ex[0])[0].name] = ex[1].title
                    } catch (error) {
                      // eslint-disable-next-line prefer-destructuring
                      el[state.indOp.filter(e => e.id === ex[0])[0].name] = ex[1].title
                    }
                  } else {
                    if (state.indOp.filter(e => e.id === ex[0])[0].type === 3) {
                      num3 += 1
                    } else if (state.indOp.filter(e => e.id === ex[0])[0].type === 2) {
                      num2 += 1
                    } else if (state.indOp.filter(e => e.id === ex[0])[0].type === 1) {
                      num1 += 1
                      console.log('type 1', ex[1])
                    }
                    // eslint-disable-next-line prefer-destructuring
                    el[state.indOp.filter(e => e.id === ex[0])[0].name] = ex[1]
                  }
                } else {
                  console.log('ess', state.indOp)
                  console.log('e', ex[0])
                  console.log('ess2-', state.indOp.filter(e => e.id === 20))
                  console.log('error', state.indOp.filter(e => e.id === ex[0]))
                  numError += 1
                }
              })
            }
          })
          console.log('num', num)
          console.log('1', num1)
          console.log('2', num2)
          console.log('3', num3)
          console.log('4', num4)
          console.log('Error', numError)
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
    return new Promise(((resolve, reject) => {
      const rg = state.range_rep_case
      console.log(rg)
      const startDate = rg.split('to')[0]
      const endDate = rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1]
      console.log(startDate)
      console.log(startDate)
      API.apiClient
        .post('/api/project/report_case_tools', {
          prjprefix: payload.prefix,
          type: payload.type,
          from: startDate,
          to: endDate,
        })
        .then(resp => {
          console.log('resp')
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
    }))
  },
  GET_REPORT_INV({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/report_inv_tools', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data.lst)
          state.invField = []
          state.invExportField = []
          state.invItem = []
          // Field
          resp.data.res.forEach(ls => {
            state.invField = []
            state.invField.push({
              key: 'org_name', label: 'Organization Name',
            })
            state.invField.push({
              key: 'wh_name', label: 'Warehouse Name',
            })
            ls.lst.forEach(element => {
              state.invField.push({
                key: element.items_name, label: element.items_name,
              })
            })
            console.log('ls', ls)
            const obj = Object()
            state.invField.forEach(element => {
              const lbl = element.label
              obj[lbl] = element.key
            })
            const js = JSON.stringify(obj)
            state.invExportField = JSON.parse(js)
            const un = ls.res.filter((value, index, self) => index === self.findIndex(t => (
              t.wh_id === value.wh_id
            )))
            console.log('un', un)
            //            const listItem = []
            const vl = []
            ls.lst.forEach(e => {
              vl.push(e.items_name)
            })
            console.log('vl', vl)
            un.forEach(el => {
              // const ls = []
              vl.forEach(elm => {
                console.log('el', el, el.wh_id)
                console.log('elm', elm, elm)
                const vv = ls.res.filter(l => l.itm_name === elm && l.wh_id === el.wh_id)
                el[elm] = vv[0].itm_total
                console.log('elmv', vv)
              })
              if (el.wh_name === 'Total') {
                el._rowVariant = 'danger'
              }
              if (el.wh_name === 'Distributor Warehouses') {
                el._rowVariant = 'success'
              }
              state.invItem.push(el)
            })
            // state.invItem = listItem
            console.log('field', state.invField)
            console.log('item', state.invItem)
          })
          // Item
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
    }))
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
