// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    return API.apiClient
      .get('/api/project/getCaseAssignment', {
        params: {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,

        },
      })
      .then(resp => {
        console.log(resp)
        state.caseItem = []
        state.UsersOtions = []
        state.selectedOrgRef = []
        state.orgList = []
        if (Object.entries(resp.data).length !== 0) {
          resp.data[1].forEach(element => {
            state.caseItem.push(element)
          })
          resp.data[0].forEach(element => {
            state.UsersOtions.push(element)
          })
          resp.data.org.forEach(element => {
            state.orgList.push({
              value: element.org_id,
              title: element.org_name,
            })
          })

          // eslint-disable-next-line prefer-destructuring
          state.selectedOrgRef = state.orgList[0]
          console.log(state.selectedOrgRef)
        }
        if (localStorage.getItem('caseAssignment:TypeOptions') != null) {
          state.typeOptions = JSON.parse(localStorage.getItem('caseAssignment:TypeOptions'))
        }
        if (localStorage.getItem('caseAssignment:CadOptions') != null) {
          state.cadOptions = JSON.parse(localStorage.getItem('caseAssignment:CadOptions'))
        }
        if (localStorage.getItem('caseAssignment:IssOptions') != null) {
          state.issOptions = JSON.parse(localStorage.getItem('caseAssignment:IssOptions'))
        }
        if (localStorage.getItem('caseAssignment:Referral') != null) {
          state.referral = JSON.parse(localStorage.getItem('caseAssignment:Referral'))
        }
        if (localStorage.getItem('caseAssignment:Gov') != null) {
          state.governorate = JSON.parse(localStorage.getItem('caseAssignment:Gov'))
        }
        if (localStorage.getItem('caseAssignment:Dis') != null) {
          state.district = JSON.parse(localStorage.getItem('caseAssignment:Dis'))
        }
        if (localStorage.getItem('caseAssignment:Type') != null) {
          state.type = JSON.parse(localStorage.getItem('caseAssignment:Type'))
        }
        if (localStorage.getItem('caseAssignment:Cadaster') != null) {
          state.cadaster = JSON.parse(localStorage.getItem('caseAssignment:Cadaster'))
        }
        if (localStorage.getItem('caseAssignment:ISS') != null) {
          state.iss = JSON.parse(localStorage.getItem('caseAssignment:ISS'))
        }
        if (localStorage.getItem('caseAssignment:RangeDate') != null) {
          state.rangedate = JSON.parse(localStorage.getItem('caseAssignment:RangeDate'))
        }
        if (localStorage.getItem('caseAssignment:PerPage') != null) {
          state.perPage = JSON.parse(localStorage.getItem('caseAssignment:PerPage'))
        }
        if (localStorage.getItem('caseAssignment:sortBy') != null) {
          state.sortBy = JSON.parse(localStorage.getItem('caseAssignment:sortBy'))
        }
        if (localStorage.getItem('caseAssignment:sortDesc') != null) {
          state.sortDesc = JSON.parse(localStorage.getItem('caseAssignment:sortDesc'))
        }
        if (localStorage.getItem('caseAssignment:sortDirection') != null) {
          state.sortDirection = JSON.parse(localStorage.getItem('caseAssignment:sortDirection'))
        }
        if (localStorage.getItem('caseAssignment:filterOn') != null) {
          state.sortDirection = JSON.parse(localStorage.getItem('caseAssignment:filterOn'))
        }
        return resp
      })
      .catch(error => {
        throw Error(error)
      })
  },
  GET_USER({ state, commit }, payload) {
    state.show = true

    commit('SET_USER', payload.value)
    console.log(payload.prefix, state.usersValue)

    return API.apiClient
      .get('/api/project/case-user', {
        params: {
          prefix: payload.prefix,
          user: state.usersValue.id,
          type: payload.type,

        },
      })
      .then(resp => {
        console.log(resp)
        if (resp.data != null) {
          state.userItem = []
          if (resp.data.length !== 0) {
            state.userItem = resp.data
          }
        }
        state.show = false
        return resp.data
      })
      .catch(error => {
        state.show = false
        throw Error(error)
      })
  },
  SEND_TO_LINK({ state }, payload) {
    state.show = true
    console.log('payload', payload, state.selectedCase)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send-to-link', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,

          items: state.selectedCase,
        })
        .then(resp => {
          console.log('result', resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            resp.data[0][1].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data[0][0].forEach(element => {
              state.UsersOtions.push(element)
            })
          }
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log('error', error)
          console.log('error', error.response)
          state.show = false
          reject(error)
        })
    })
  },
  SEND_TO_ORG({ state }, payload) {
    state.show = true
    console.log('payload', payload, state.selectedCase)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send-to-org', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,

          items: state.selectedCase,
          org: state.selectedOrgRef.value,
        })
        .then(resp => {
          console.log('result', resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            resp.data[0][1].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data[0][0].forEach(element => {
              state.UsersOtions.push(element)
            })
          }
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log('error', error)
          state.show = false
          reject(error)
        })
    })
  },
  SEND_TO_USER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send-to-user', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,

          user: state.usersValue.id,
          items: state.selectedCase,
        })
        .then(resp => {
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data[1][1].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data[1][0].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data[2].forEach(element => {
              state.userItem.push(element)
            })
          }
          state.saved = false
          state.show = false
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  DELETE_TO_USER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/delete-to-user', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          user: state.usersValue.id,
          items: payload.val,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data[1][1].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data[1][0].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data[2].forEach(element => {
              state.userItem.push(element)
            })
          }
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  DELETE_ALL_TO_USER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/delete-all-to-user', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          user: state.usersValue.id,
          items: payload.val,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data[1][1].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data[1][0].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data[2].forEach(element => {
              state.userItem.push(element)
            })
          }
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
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
    }))
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null ? null : state.district.value,
            type: state.type == null ? null : state.type.value,
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
    }))
  },
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: state.type == null ? null : state.type.value,
            cad: state.cadaster == null ? null : state.cadaster.value,
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
    }))
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.saved = true
      state.show = true
      state.caseItem = []
      state.userItem = []
      state.UsersOtions = []
      state.usersValue = null
      state.governorate = null
      state.referral = null
      state.district = null
      state.cadaster = null
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      state.type = null
      state.iss = null
      state.rangedate = null
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
      state.usersValue = null
      state.showModalRef = { active: false }
      state.selectedOrgRef = []
      state.orgList = []
      dispatch('GET_DATA', {
        prefix: payload.prefix,
        prefixRole: payload.prefixRole,
        type: payload.type,
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
}
