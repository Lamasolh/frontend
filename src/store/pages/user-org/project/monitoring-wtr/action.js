// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  /// Get Data
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      // Options
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      ///
      state.referral = null
      state.district = null
      state.governorate = null
      state.type = null
      state.iss = null
      state.cadaster = null
      state.rangedate = null
      //
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
        start: payload.startDate,
        type: payload.type,
        end: payload.endDate,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_DATA({ state }, payload) {
    console.log('res', payload)
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    console.log('d1', startDate)
    console.log('d2', endDate)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getMonitoringWtr', {
          params: {
            prefix: payload.prefix,
            type: payload.type,
            prefixRole: payload.prefixRole,
            start: new Date(startDate).toDateString(),
            end: new Date(endDate).toDateString(),
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.res)
          state.caseItem = []
          state.orgList = []
          state.CycleTypeOptions = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.res.forEach((element, index) => {
              const el = resp.data.res[index]
              // _rowVariant: 'success'
              const differenceInTime = Date.now() - Date.parse(el.cycle_deadline)

              // To calculate the no. of days between two dates
              const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))
              if (differenceInDays < 0) {
                // eslint-disable-next-line no-underscore-dangle
                el._cellVariants = { cycle_deadline: 'success', cycle_deadline_day: 'success' }
              } else if (differenceInDays === 0) {
                // eslint-disable-next-line no-underscore-dangle
                el._cellVariants = { cycle_deadline: 'warning', cycle_deadline_day: 'warning' }
              } else {
                // eslint-disable-next-line no-underscore-dangle
                el._cellVariants = { cycle_deadline: 'danger', cycle_deadline_day: 'danger' }
              }

              state.caseItem.push(el)
            })
            state.CycleTypeOptions.push(
              {
                title: 'Periodic',
                value: 1,
                variant: 'success',
              },
            )

            resp.data.cycleType.forEach(element => {
              state.CycleTypeOptions.push(
                {
                  title: element.name,
                  value: element.type_id,
                  variant: element.variant,
                },
              )
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

  /// Get Options
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: state.district == null ? null : state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_TYPE', resp.data.result)
          console.log(state.typeOptions)
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
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null
              ? null
              : state.district.value,
            type: 4,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.result)
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
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: 4,
            cad:
                            state.cadaster == null ? null : state.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ISS', resp.data.result)
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
  DELETE_CASE({ state }, payload) {
    state.show = true
    const d = new Date(payload.endDate)
    const d1 = new Date(payload.startDate)
    const startDate = d1.setDate(d1.getDate() - 1)
    const endDate = d.setDate(d.getDate() + 1)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/MoniToolsEndCase', {
          items: state.deleteItem,
          type: payload.type,
          ph: payload.ph,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          start: new Date(startDate).toDateString(),
          end: new Date(endDate).toDateString(),
        })
        .then(resp => {
          console.log(resp)
          state.caseItem = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.get.case.forEach(element => {
              state.caseItem.push(element)
            })
          }
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

}
