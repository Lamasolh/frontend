// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/register-org')
        .then(resp => {
          console.log(resp)
          resp.data.job.shift()
          commit('SET_JOB_OP', resp.data.job)
          resp.data.gender.shift()
          commit('SET_GEN_OP', resp.data.gender)
          commit('SET_NAT_OP', resp.data.nat)
          commit('SET_GOV_OP', resp.data.gov)
          commit('SET_DIS_OP', resp.data.dis)
          commit('SET_CAD_OP', resp.data.cad)
          resp.data.org.shift()
          commit('SET_TYPE_OP', resp.data.org)
          state.show = false
          console.log(state.disOp)
          resolve()
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
  SEND_TO_SEC({ state }) {
    state.show = true
    const cnt = state.orgPhone.id === 1 ? '961' : '963'
    const phoneOrg = cnt + state.orgPhone.number
    const cnt1 = state.userPhone.id === 1 ? '961' : '963'
    const phoneUser = cnt1 + state.userPhone.number
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/create_org', {
          orgLogo: state.orgLogo,
          orgName: state.orgName,
          orgDisName: state.orgDisName,
          orgRegNumber: state.orgRegNumber,
          orgPrefix: state.orgPrefix,
          orgType: state.orgType.value,
          orgContact: state.orgContact,
          orgPhone: phoneOrg,
          orgEmail: state.orgEmail,
          orgWebsite: state.orgWebsite,
          orgCad: state.orgCad.value,
          orgAddress: state.orgAddress,
          orgDescription: state.orgDescription,
          userLogo: state.userLogo,
          userName: state.userName,
          userFN: state.userFN,
          userLN: state.userLN,
          userFNAR: null,
          userLNAR: null,
          userGender: state.userGender.value,
          userNat: state.userNat.value,
          userDOB: state.userDOB,
          userEmail: state.userEmail,
          userPhone: phoneUser,
          userJob: state.userJob.value,
          userBio: state.userBio,
          userAddress: state.userAddress,
        })
        .then(resp => {
          console.log('resp', resp)
          state.show = false
          console.log('result', resp.data[0].result)
          console.log('result', resp.data)
          console.log('result', resp.data[0][0])

          resolve(resp.data[0][0])
        })
        .catch(error => {
          console.log('err', error)
          state.show = false
          reject(error)
        })
    }))
  },
}
