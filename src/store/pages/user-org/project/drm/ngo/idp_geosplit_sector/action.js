// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state, commit }, payload) {
    state.show = true
    console.log('GET_DATA action called with payload:', payload)
    return API.apiClient
      .get('/api/project/sector/getProjectGeo', {
        params: {
          prefix: payload.prefix,
          prefixRole: 'DSTRB',
          type: payload.type,
        },
      })
      .then(resp => {
        console.log('API response data:', resp.data) // Check data structure here
        commit('SET_ITEM', resp.data) // Ensure data structure matches

        state.show = false
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        state.show = false
      })
  },

  GET_USER({ state, commit }, payload) {
    state.show = true
    console.log(payload)
    commit('SET_USER', payload.value)
    return API.apiClient
      .get('/api/project/sector/getProjectGeo', {
        params: {
          prefix: payload.prefix,
          user: payload.value.id,
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
  SEND_TO_USER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/sector/getProjectGeo', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          user: state.usersValue.id,
          items: state.selectedCase,
          type: payload.type,

        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.us.forEach(element => {
              state.userItem.push(element)
            })
          }
          state.saved = false
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  SEND_TO_SECTOR({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send-to-user-sector', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          items: state.selectedCase,
        })
        .then(resp => {
          console.log(resp)
          if (resp.status === 200) {
            if (Object.entries(resp.data).length !== 0) {
              if (resp.data.res != null) {
                state.caseItem = []
                state.UsersOtions = []
                state.userItem = []
                resp.data.get[1].forEach(element => {
                  state.UsersOtions.push(element)
                })
                resp.data.get[0].forEach(element => {
                  state.caseItem.push(element)
                })
                resp.data.us.forEach(element => {
                  state.userItem.push(element)
                })
              }
            }
          }
          state.saved = false
          state.show = false
          resolve(resp.data.res)
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
        .post('/api/project/delete-to-user-geo', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          user: state.usersValue.id,
          items: payload.val,
          type: payload.type,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          console.log('resp')
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            if (resp.data.res != null) {
              state.caseItem = []
              state.UsersOtions = []
              state.userItem = []
              resp.data.get[0].forEach(element => {
                state.caseItem.push(element)
              })
              resp.data.get[1].forEach(element => {
                state.UsersOtions.push(element)
              })
              resp.data.us.forEach(element => {
                state.userItem.push(element)
              })
            }
          }
          console.log('resp')
          resolve(resp.data.res)
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
        .post('/api/project/delete-all-to-user-geo', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          user: state.usersValue.id,
          items: payload.val,
          type: payload.type,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data.us.forEach(element => {
              state.userItem.push(element)
            })
          }
          resolve(resp.data.res)
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
  GET_TYPE_EDIT({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: payload.district == null ? null : payload.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  GET_CAD_EDIT({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: payload.district == null ? null : payload.district.value,
            type: payload.type == null ? null : payload.type.value,
          },
        })
        .then(resp => {
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  GET_ISS_EDIT({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: payload.type == null ? null : payload.type.value,
            cad: payload.cadaster == null ? null : payload.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.result)
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
      console.log(payload.type === '2')
      if (payload.type === '2') {
        state.caseField = [
          { key: 'selected', label: 'Check' },
          { key: 'full_name', label: 'Full Name', sortable: true },
          { key: 'referral_name', label: 'Referral', sortable: true },
          { key: 'cadastre_name', label: 'Cadaster', sortable: true },
          { key: 'priority_level', label: 'Priority', sortable: true },
          { key: 'show_details', label: 'ShowDetails' },
          { key: 'delete', label: 'End Case', sortable: true },
        ]
      } else {
        state.caseField = [
          { key: 'selected', label: 'Check' },
          { key: 'full_name', label: 'Full Name', sortable: true },
          { key: 'referral_name', label: 'Referral', sortable: true },
          { key: 'cadastre_name', label: 'Cadaster', sortable: true },
          { key: 'priority_level', label: 'Priority', sortable: true },
          { key: 'show_details', label: 'ShowDetails' },
          { key: 'delete', label: 'End Case', sortable: true },
        ]
      }
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
  EndCase({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/geo_endcase', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.endItem.item,
          ph: payload.ph,
          type: payload.type,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          console.log('resp')
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
            resp.data.us.forEach(element => {
              state.userItem.push(element)
            })
          }
          console.log('resp')
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  Update({ state }, payload) {
    state.show = true
    const cnt = payload.country.id === 1 ? '961' : '963'
    const ph = cnt + payload.country.number
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/geo_update_case', {
          case_id: payload.case_id,
          projType: payload.projType,
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          full_name: payload.full_name,
          phone: ph,
          address: payload.adresstext,
          nationality: payload.nationality.value,
          cad: payload.cad == null ? null : payload.cad.value,
          iss: payload.iss == null ? null : payload.iss.value,
          type: payload.type == null ? null : payload.type.value,
          address_latitude: payload.address_latitude,
          address_longitude: payload.address_longitude,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          console.log('resp')
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            state.userItem = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
          }
          console.log('resp')
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  SEND_TO_ASSM_USER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/geo_send_assm_user', {
          prefix: payload.prefix,
          prefixRole: 'DSTRB',
          type: payload.type,
          items: payload.itm,
          user: state.selecteduser,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          console.log('resp')
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
          }
          console.log('rssesp')
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  SEND_TO_ASSM({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/geo_send_assm', {
          prefix: payload.prefix,
          prefixRole: 'DSTRB',
          type: payload.type,
          items: payload.itm,
        })
        .then(resp => {
          state.saved = false
          state.show = false
          console.log('resp')
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.caseItem = []
            state.UsersOtions = []
            resp.data.get[0].forEach(element => {
              state.caseItem.push(element)
            })
            resp.data.get[1].forEach(element => {
              state.UsersOtions.push(element)
            })
          }
          console.log('rssesp')
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  CHECK_DUPL(context, payload) {
    const cnt = payload.country.id === 1 ? '961' : '963'
    const ph = cnt + payload.country.number
    console.log(payload, ph)
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/follow_check_phone', {
          params: {
            prefix: payload.prefix,
            phone: ph,
            type: payload.type,
            caseId: payload.caseId,
          },
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data[0][0].dup)
          resolve(resp.data[0][0].dup)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}
