// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SendMessage({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      console.log('sd')
      API.apiClient
        .post('/api/helpcenter/SendMessage', {
          email: state.email,
          subject: state.subject,
          message: state.message,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error.response)
        })
    })
  },
  ChangeAdmin({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/HelpDesk', {
          email: state.orgadmin,
          type: 1,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  ChangeOrgEmail({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/HelpDesk', {
          email: state.emaiLadmin,
          type: 2,
        })
        .then(resp => {
          console.log('res', resp)
          console.log('res', resp.data[0])
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  ChangeAdminEmail({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/HelpDesk', {
          email: state.emaiLorg,
          type: 3,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  /// GEt
  GET_ChangeAdmin({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/helpcenter/GetHelpDesk', {
          params: {
            email: payload.email,
            type: 1,
            token: payload.token,
          },
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          if (resp.data[0].id != null) {
            commit('ADD_USERS_OPTIONS', { data: resp.data })
            state.orgid = resp.data[0].org_id
          }
          resolve(state.orgid != null ? 1 : 0)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_ChangeOrgEmail({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/helpcenter/GetHelpDesk', {
          params: {
            email: payload.email,
            type: 2,
            token: payload.token,
          },
        })
        .then(resp => {
          console.log('res', resp)
          if (resp.data[0].result === 1) {
            state.orgid = resp.data[0].orgid
          }
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_ChangeAdminEmail({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/helpcenter/GetHelpDesk', {
          params: {
            email: payload.email,
            type: 3,
            token: payload.token,
          },
        })
        .then(resp => {
          console.log('res', resp)
          if (resp.data[0].result === 1) {
            state.orgid = resp.data[0].orgid
          }
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  /// Link Change Admin
  ChangeAdminLink({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/ExcuteChangeAdmin', {
          type: 1,
          org_id: state.orgid,
          userid: state.userAdminChange != null ? state.userAdminChange.value : null,
          email: null,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  ChangeOrgEmailLink({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/ExcuteChangeAdmin', {
          type: 2,
          org_id: state.orgid,
          userid: null,
          email: state.changeOrgEmail,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  ChangeAdminEmailLink({ state }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/helpcenter/ExcuteChangeAdmin', {
          type: 3,
          org_id: state.orgid,
          userid: null,
          email: state.changeAdminEmail,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },

}
