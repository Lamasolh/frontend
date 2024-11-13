/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_ROLE({ state }, payload) {
    state.show = true
    console.log('payload.proj.assmnt_type')
    console.log(payload.proj.assmnt_type)
    if (payload.proj.assmnt_type === 2) {
      state.rolesField = [
        { key: 'full_name', label: 'Full Name', stickyColumn: true },
        { key: 'monitoring_tools', label: 'Monitoring' },
        { key: 'reporting_tools', label: 'Reporting' },
      ]
    } else {
      state.rolesField = [
        { key: 'full_name', label: 'Full Name', stickyColumn: true },
        { key: 'monitoring_tools', label: 'Monitoring' },
        { key: 'reporting_tools', label: 'Reporting' },
        { key: 're_assign', label: 'Re-Assign' },
      ]
    }
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-role-org-project', {
          params: {
            project: payload.prefix,
          },
        })
        .then(resp => {
          console.log('resp', resp.data)
          if (Object.entries(resp.data).length !== 0) {
            state.rolesItem = []
            state.selectItem = []
            // state.rolesField = []
            resp.data[0].forEach(element => {
              state.rolesItem.push(element)
              /* state.rolesField.push({
                key: element.prefix,
                label: element.role_name,
              }) */
            })
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
  Save_ROLE({ state }, payload) {
    state.show = true
    const item = []
    state.selectItem.forEach(el => {
      item.push({
        id: el.id,
        assessment: typeof el.assessment !== 'number' ? el.assessment ?? null : el.assessment !== 0,
        awareness: typeof el.awareness !== 'number' ? el.awareness ?? null : el.awareness !== 0,
        case_assignment: typeof el.case_assignment !== 'number' ? el.case_assignment ?? null : el.case_assignment !== 0,
        distributor: typeof el.distributor !== 'number' ? el.distributor ?? null : el.distributor !== 0,
        geo_split: typeof el.geo_split !== 'number' ? el.geo_split ?? null : el.geo_split !== 0,
        inventory: typeof el.inventory !== 'number' ? el.inventory ?? null : el.inventory !== 0,
        indicators: typeof el.indicators !== 'number' ? el.indicators ?? null : el.indicators !== 0,

        link_assessment: typeof el.link_assessment !== 'number' ? el.link_assessment ?? null : el.link_assessment !== 0,
        monitoring: typeof el.monitoring !== 'number' ? el.monitoring ?? null : el.monitoring !== 0,
        referral_entry: typeof el.referral_entry !== 'number' ? el.referral_entry ?? null : el.referral_entry !== 0,
        reporting: typeof el.reporting !== 'number' ? el.reporting ?? null : el.reporting !== 0,
        monitoring_tools: typeof el.monitoring_tools !== 'number' ? el.monitoring_tools ?? null : el.monitoring_tools !== 0,
        reporting_tools: typeof el.reporting_tools !== 'number' ? el.reporting_tools ?? null : el.reporting_tools !== 0,
        re_assign: typeof el.re_assign !== 'number' ? el.re_assign ?? null : el.re_assign !== 0,
        role_cat: el.role_cat_id == null ? null : el.role_cat_id,
        re_entity: payload.re_entity,
      })
    })
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/update-project-role', {
          items: item,
          prefix: payload.prefix,
        })
        .then(resp => {
          console.log(resp)
          state.rolesItem.forEach(el => {
            el._rowVariant = null
          })
          state.rolesItem.forEach(el => {
            resp.data.prj.forEach(elm => {
              if (el.id === elm[1].id) {
                if (elm[0].result === 1) {
                  state.rolesItem.filter(it => it.id === elm[1].id)[0]._rowVariant = 'success'
                } else {
                  state.rolesItem.filter(it => it.id === elm[1].id)[0]._rowVariant = 'danger'
                }
                // el.push({ _rowVariant: 'danger' })
              }
            })
          })
          state.show = false
          state.selectItem.splice(0)
          state.selectItem.length = 0
          state.selectItem = []
          setTimeout(() => {
            state.selectItem.pop()
          }, 300)
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      state.projectItem = []
      state.perPage = 10
      state.totalRows = 0
      state.currentPage = 1
      // Sort
      state.sortBy = ''
      state.sortDesc = false
      state.sortDirection = 'asc'
      // Filter
      state.filter = null
      state.filterOn = []
      dispatch('GET_DATA', {
        prefix: payload.prefix,
        prefixRole: payload.prefixRole,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
