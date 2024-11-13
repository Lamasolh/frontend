/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import moment from 'moment'

export default {
  GET_DETAILS({ state }, payload) {
    state.show = true
    state.note = null
    console.log('refresh', payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/drm/getMonitoringDetails', {
          params: {
            issId: payload.issId,
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data)
          state.caseItem = []
          state.noidp = null
          state.capacity = null
          state.deadline = null
          state.duration = null
          state.amount = null
          state.focal_point = null
          state.focal_point_ph = null
          state.quota = null
          state.status = null
          state.qtyNeeded = null
          state.qty_perDay = null
          state.org = null
          const item = resp.data.data[0]
          state.noidp = item.no_idps
          state.capacity = item.srvc_capacity
          state.deadline = item.deadline
          state.duration = item.duration
          state.amount = item.amount_needed
          state.focal_point = item.focal_name
          state.focal_point_ph = item.focal_phone
          state.status = item.stat

          state.orgList = [
            {
              id: 1,
              title: 'WASH Sector',
            },
            {
              id: 125,
              title: 'Water Establishment - Imad',
            },
            {
              id: 126,
              title: 'Water Establishment - Ziad',
            },
            {
              id: 127,
              title: 'Water Establishment - Mahmoud',
            },
            {
              id: 128,
              title: 'Beirut Fire Brigade',
            },
          ]
          state.quota = item.qouta
          state.org = {
            id: resp.data.qota[0].org_id,
            title: resp.data.qota[0].org_prefix,

          }
          state.orgList.push({
            id: resp.data.qota[0].org_id,
            title: resp.data.qota[0].org_prefix,

          })
          if (state.quota == null) {
            state.quota = resp.data.qota[0].def_module_qcd
          }

          console.log(state.noidp, state.quota)
          state.qty_perDay = (state.noidp == null || state.quota == null ? 0 : state.quota * state.noidp)
          console.log(state.duration, state.qty_perDay)

          state.qtyNeeded = state.duration * state.qty_perDay
          state.deadline = moment().add(state.duration, 'days').format('YYYY-MM-DD')

          if (Object.entries(resp.data).length !== 0) {
            resp.data.info.forEach(element => {
              if (element.statuss === 'Pending') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'warning'
              } else if (element.statuss === 'In Progress') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'info'
              } else if (element.statuss === 'Done') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'success'
              }
              state.caseItem.push(element)
            })
          }

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
  SUBMIT({ state }, payload) {
    state.show = true
    console.log(payload, state.note)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/drm/saveMonitoringDetails', {
          issId: payload.issId,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          noidp: state.noidp,
          capacity: state.capacity,
          focal_point: state.focal_point,
          focal_point_ph: state.focal_point_ph,
          qtyNeeded: state.qtyNeeded,
          duration: state.duration,
          deadline: state.deadline,
          quota: state.quota,
          org_id: state.org.id,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.show = false
          if (Object.entries(resp.data).length !== 0) {
            resp.data.info.forEach(element => {
              if (element.statuss === 'Pending') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'warning'
              } else if (element.statuss === 'In Progress') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'info'
              } else if (element.statuss === 'Done') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'success'
              }
              state.caseItem.push(element)
            })
          }

          resolve(resp.data)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error.response)
        })
    }))
  },
}
