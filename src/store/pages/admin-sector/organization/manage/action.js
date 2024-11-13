// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  orgApprove({ state }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/approve-org', {
          orgId: state.orgID,
          orgType: state.orgType.value,
        })
        .then(resp => {
          console.log('ap', resp)
          state.show = false
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
  orgDonor({ state }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/org_donor', {
          orgId: state.orgID,
        })
        .then(resp => {
          console.log('ap', resp)
          state.show = false
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
  orgActive({ state }, payload) {
    state.show = true
    console.log(state.orgDataInfo)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/active_org', {
          orgId: payload,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
  orgNotActive({ state }) {
    state.show = true
    console.log(state.orgID)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/not-active_org', {
          orgId: state.orgID,
          reason: state.reason,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
}
